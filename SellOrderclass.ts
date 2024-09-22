export class Sell {             //Clase ventas
    private company: string;    //Nombre de la compañia
    private quantity: number;   //Cantidad de acciones a comprar
    private minPrice: number;   //Precio minimo de venta
    private seller: string;     //Nombre del vendedor

    constructor(company: string, quantity: number, minPrice: number, seller: string) {
        this.company = company;
        this.quantity = quantity;
        this.minPrice = minPrice;
        this.seller = seller;
    }

    public getMinPrice(): number {      //Metodos get para obtener el dato que necesitemos
        return this.minPrice;           //en nuestro heap
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getCompany(): string {
        return this.company;
    }

    public getSeller(): string {
        return this.seller;
    }

    public reduceQuantity(amount: number): void {   //Con este metodo obtenemos la cantidad de accciones
        this.quantity -= amount;                    //que se compraran y se quitaran de las puestas inicialmente
    }
}

export class MinHeap {
    public heap: Sell[];    // Arreglo de tipo Sell
    private n: number;

    constructor(size: number) {     // Creamos nuestro heap
        this.heap = new Array(size + 1);    // Iniciamos en la posición 1
        this.n = 0; // Elementos ingresados
    }

    public insert(order: Sell): void {  // Método para insertar datos
        if (this.n == this.heap.length - 1) this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order;
        this.swim(this.n);  
    }

    public getMin(): Sell | null {  // Función para obtener la mejor oferta
        if (this.n === 0) return null;
        const min = this.heap[1];
        this.heap[1] = this.heap[this.n]; // Mueve el último elemento a la raíz
        this.heap[this.n] = null!; // Elimina el último elemento
        this.n--;
        this.sink(1); // Reestructura el heap
        return min;
    }

    public removeMin(): void {  // Método para eliminar la mejor oferta
        if (this.n === 0) return;
        this.heap[1] = this.heap[this.n]; // Mueve el último elemento a la raíz
        this.heap[this.n] = null!; // Elimina el último elemento
        this.n--;
        this.sink(1); // Reestructura el heap
    }

    private swim(i: number): void {     // Aquí comparamos los datos para subir
        let padre: number = Math.floor(i / 2);
        while (i > 1 && this.heap[padre].getMinPrice() > this.heap[i].getMinPrice()) {
            [this.heap[padre], this.heap[i]] = [this.heap[i], this.heap[padre]];
            i = padre;
            padre = Math.floor(i / 2);
        }
    }

    private sink(i: number): void {     // Aquí comparamos los datos para bajar
        while (2 * i <= this.n) {
            let j = 2 * i; // El hijo izquierdo
            if (j < this.n && this.heap[j].getMinPrice() > this.heap[j + 1].getMinPrice()) {
                j++; // Elige el hijo derecho si es menor
            }
            if (this.heap[i].getMinPrice() <= this.heap[j].getMinPrice()) break; // Si el padre es menor o igual, termina
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; // Intercambia el padre con el hijo menor
            i = j; // Continúa con el siguiente nivel
        }
    }

    private resize(newSize: number): void { // Reorganización del array
        const newHeap = new Array(newSize);
        for (let i = 1; i <= this.n; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public show(): void {   // Mostramos los datos de nuestros vendedores, cantidad, compañía y precio
        console.log("Órdenes de ventas:");
        for (let i = 1; i <= this.n; i++) {
            const order = this.heap[i];
            console.log(`Vendedor: ${order.getSeller()}, Empresa: ${order.getCompany()}, Cantidad de acciones: ${order.getQuantity()}, Precio mínimo venta: ${order.getMinPrice()}`);
        }
    }
}
