export class Sell {             //Definimos la clase Sell para nuestras ventas
    private company: string;    
    private quantity: number;
    private minPrice: number;
    private seller: string;

    constructor(company: string, quantity: number, minPrice: number, seller: string) {
        this.company = company;
        this.quantity = quantity;
        this.minPrice = minPrice;
        this.seller = seller;
    }

    public getCompany(): string {   //Con esto obtenemos la compañia
        return this.company;
    }

    public getOffert(): number {    //Obtenemos la oferta minima
        return this.minPrice;
    }

    public getQuantity(): number {  //
        return this.quantity;
    }

    public getSeller(): string {
        return this.seller;
    }

    public reduceQuantity(amount: number): void {
        this.quantity -= amount;
    }
}

export class MinHeap {
    public heap: Sell[]; // Arreglo de tipo sell que guarda las órdenes de venta
    private n: number; // Cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1); // Se crea el heap inicia en la posicion 1
        this.n = 0;
    }

    public checkMin(): Sell | null {
        return this.heap[1] || null; // Devuelve el elemento minimo si existe si no, nos retorna null
    }

    public getQuantity(): number {
        return this.n; // Devuelve la cantidad de ordenes en el heap
    }

    public insert(sell: Sell): void {
        if (this.n == (this.heap.length - 1)) // Si el heap está lleno lo redimensiona
            this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = sell; // Insertamos la nueva orden en el heap
        this.swap(this.n); // Reordenamos para mantener la propiedad del heap
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2); // 
        while (i > 1 && this.heap[father].getOffert() > this.heap[i].getOffert()) {
            // Intercambia si el padre es mayor que el hijo
            const temp: Sell = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2); 
        }
    }

    private resize(newSize: number): void {
        const newHeap: Sell[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++) {
            newHeap[i] = this.heap[i]; 
        }
        this.heap = newHeap; // 
    }

    public getMin(): Sell | null {
        if (this.n == 0) return null; // Si el heap está vacío, devuelve null

        const min: Sell = this.heap[1]; // Se guarda la direccion del minimo
        this.heap[1] = this.heap[this.n]; 
        this.heap[this.n] = null!; // Se elimina el ultimo elemento
        this.n--; 
        this.sink(1); 
        return min; // nos devuelve el minimo
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i; 
            if (j < this.n && this.heap[j].getOffert() > this.heap[j + 1].getOffert()) {
                j++; 
            }
            if (this.heap[i].getOffert() <= this.heap[j].getOffert()){
                break;
            } // Si ya está en orden, se detiene

            const temp: Sell = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j; 
        }
    }

    public show(): void {   //nose muestra las ordenes de venta
        console.log("Ofertas:");
        for (let i = 1; i <= this.n; i++) {
            const accion = this.heap[i];
            console.log(`Vendedor: ${accion.getSeller()}, Empresa: ${accion.getCompany()}, Precio Mínimo: ${accion.getOffert()}`);
        }
    }
}

