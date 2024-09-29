export class BuyOrder {             //Definimos la clase BuyOrder para nuestras compras
    private company: string;
    private quantity: number;
    private maxPrice: number;
    private buyer: string;

    constructor(company: string, quantity: number, maxPrice: number, buyer: string) {
        this.company = company;
        this.quantity = quantity;
        this.maxPrice = maxPrice;
        this.buyer = buyer;
    }

    public getCompany(): string {   //Con esto obtenemos la compañia
        return this.company;
    }

    public getMaxPrice(): number {  //Obtenemos la mejor oferta
        return this.maxPrice;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getBuyer(): string {
        return this.buyer;
    }

    public reduceQuantity(amount: number): void {
        this.quantity -= amount;
    }
}


export class MaxHeap {
    public heap: BuyOrder[]; // Arreglo de tipo BuyOrder que guarda las ordenes de compra
    private n: number; // Cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1); // Se crea el heap inicia en la posicion 1
        this.n = 0;
    }

    public checkMax(): BuyOrder | null {
        return this.heap[1] || null; // Devuelve el máximo si existe
    }

    public getQuantity(): number {
        return this.n; // Devuelve la cantidad de ordenes en el heap
    }

    public insert(order: BuyOrder): void {
        if (this.n == (this.heap.length - 1)) // Si el heap está lleno, se redimensiona
            this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order; 
        this.swap(this.n); 
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2); // El padre está en la mitad del índice del hijo
        while (i > 1 && this.heap[father].getMaxPrice() < this.heap[i].getMaxPrice()) {
            // Intercambia si el padre es menor que el hijo
            const temp: BuyOrder = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2); // Se recalcula el padre
        }
    }

    private resize(newSize: number): void {
        const newHeap: BuyOrder[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++) {
            newHeap[i] = this.heap[i]; 
        }
        this.heap = newHeap; 
    
    }
    
    public getMax(): BuyOrder | null {
        if (this.n == 0) return null; // Si el heap está vacío, devuelve null

        const max: BuyOrder = this.heap[1]; // Se guarda la direccion del maximo
        this.heap[1] = this.heap[this.n]; 
        this.heap[this.n] = null!; // Se elimina el ultimo elemento
        this.n--; 
        this.sink(1); 
        return max; // nos devuelve el maximo
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i; // Hijo izquierdo
            if (j < this.n && this.heap[j].getMaxPrice() < this.heap[j + 1].getMaxPrice()) {
                j++; // 
            }
            if (this.heap[i].getMaxPrice() >= this.heap[j].getMaxPrice()){
                break;
            }  

            const temp: BuyOrder = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j; 
        }
    }

    public show(): void {   //nos muestra las ordenes de compra
        console.log("Demandas:");
        for (let i = 1; i <= this.n; i++) {
            const accion = this.heap[i];
            console.log(`Comprador: ${accion.getBuyer()}, Empresa: ${accion.getCompany()}, Precio Máximo: ${accion.getMaxPrice()}`);
        }
    }
}


