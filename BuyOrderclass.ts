export class BuyOrder {
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

    public getMaxPrice(): number {
        return this.maxPrice;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getCompany(): string {
        return this.company;
    }

    public getBuyer(): string {
        return this.buyer;
    }

    public reduceQuantity(amount: number): void {
        this.quantity -= amount;
    }
}

export class MaxHeap {
    public heap: BuyOrder[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public insert(order: BuyOrder): void {
        if (this.n === this.heap.length - 1) this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order;
        this.swim(this.n);  // Usamos swim para reorganizar
    }

    public getMax(): BuyOrder | null {
        if (this.n === 0) return null;
        const max = this.heap[1];
        this.heap[1] = this.heap[this.n]; // Mueve el último elemento a la raíz
        this.heap[this.n] = null!; // Elimina el último elemento
        this.n--;
        this.sink(1); // Reestructura el heap
        return max;
    }

    public removeMax(): void {  // Método para eliminar la mejor oferta
        if (this.n === 0) return;
        this.heap[1] = this.heap[this.n]; // Mueve el último elemento a la raíz
        this.heap[this.n] = null!; // Elimina el último elemento
        this.n--;
        this.sink(1); // Reestructura el heap
    }

    private swim(i: number): void {
        let padre: number = Math.floor(i / 2);
        while (i > 1 && this.heap[padre].getMaxPrice() < this.heap[i].getMaxPrice()) {
            [this.heap[padre], this.heap[i]] = [this.heap[i], this.heap[padre]];
            i = padre;
            padre = Math.floor(i / 2);
        }
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j = 2 * i; // El hijo izquierdo
            if (j < this.n && this.heap[j].getMaxPrice() < this.heap[j + 1].getMaxPrice()) {
                j++; // Elige el hijo derecho si es mayor
            }
            if (this.heap[i].getMaxPrice() >= this.heap[j].getMaxPrice()) break; // Si el padre es mayor o igual, termina
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; // Intercambia el padre con el hijo mayor
            i = j; // Continúa con el siguiente nivel
        }
    }

    private resize(newSize: number): void {
        const newHeap = new Array(newSize);
        for (let i = 1; i <= this.n; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public show(): void {
        console.log("Órdenes de Compra:");
        for (let i = 1; i <= this.n; i++) {
            const order = this.heap[i];
            console.log(`Comprador: ${order.getBuyer()}, Compañía: ${order.getCompany()}, Cantidad: ${order.getQuantity()}, Precio máximo: ${order.getMaxPrice()}`);
        }
    }
}

