class Sell {             //Clase ventas
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
    public heap: Sell[];    //Arreglo de tipo sell
    private n: number;

    constructor(size: number) {     //Creamos nuestro heap
        this.heap = new Array(size + 1);    //Iniciamos en la posicion 1
        this.n = 0; //elementos ingresados
    }

    public insert(order: Sell): void {  //Metodo para insertar datos
        if (this.n == this.heap.length - 1) this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order;
        this.swap(this.n);  
    }

    public getMin(): Sell | null {  //Funcion para obetener la mejor oferta
        if (this.n === 0) return null;
        const min = this.heap[1];
        this.swap(this.n);  
        this.heap[this.n] = null!;
        this.n--;
        this.swap(1); 
        return min;
    }

    private swap(i: number): void {     //Aqui comparamos los datos
        let padre: number = Math.floor(i / 2);
        while (i > 1 && this.heap[padre].getMinPrice() > this.heap[i].getMinPrice()) {
            [this.heap[padre], this.heap[i]] = [this.heap[i], this.heap[padre]];
            i = padre;
            padre = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void { //Reorganizacion del array
        const newHeap = new Array(newSize);
        for (let i = 1; i <= this.n; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public show(): void {   //Mostramos los datos de nuestros vendedores, cantidad, compañia y precio
        console.log("Ordenes de ventas:");
        for (let i = 1; i <= this.n; i++) {
            const order = this.heap[i];
            console.log(`Vendedor: ${order.getSeller()}, Empresa: ${order.getCompany()}, Cantidad de acciones: ${order.getQuantity()}, Precio minimo venta: ${order.getMinPrice()}`);
        }
    }
}

