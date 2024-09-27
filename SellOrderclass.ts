export class Sell {
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

    public getCompany(): string {
        return this.company;
    }

    public getMinPrice(): number {
        return this.minPrice;
    }

    public getQuantity(): number {
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
    private heap: (Sell | null)[];
    private size: number;

    constructor(initialCapacity: number) {
        this.heap = new Array(initialCapacity + 1).fill(null);
        this.size = 0;
    }

    public insert(order: Sell): void {
        if (this.size == this.heap.length - 1) this.resize(2 * this.heap.length);
        this.size++;
        this.heap[this.size] = order;
        this.swim(this.size);
    }

    public getMin(): Sell | null {
        return this.size > 0 ? this.heap[1] : null;
    }

    public removeMin(): void {
        if (this.size === 0) return;
        this.heap[1] = this.heap[this.size];
        this.heap[this.size] = null;
        this.size--;
        this.sink(1);
    }

    private swim(index: number): void {
        let parent = Math.floor(index / 2);
        while (index > 1 && this.heap[parent]!.getMinPrice() > this.heap[index]!.getMinPrice()) {
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
            parent = Math.floor(index / 2);
        }
    }

    private sink(index: number): void {
        while (2 * index <= this.size) {
            let child = 2 * index;
            if (child < this.size && this.heap[child]!.getMinPrice() > this.heap[child + 1]!.getMinPrice()) {
                child++;
            }
            if (this.heap[index]!.getMinPrice() <= this.heap[child]!.getMinPrice()) break;
            [this.heap[index], this.heap[child]] = [this.heap[child], this.heap[index]];
            index = child;
        }
    }

    private resize(newCapacity: number): void {
        const newHeap = new Array(newCapacity).fill(null);
        for (let i = 1; i <= this.size; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public show(): void {
        for (let i = 1; i <= this.size; i++) {
            const order = this.heap[i];
            console.log(`Vendedor: ${order!.getSeller()}, Empresa: ${order!.getCompany()}, Cantidad: ${order!.getQuantity()}, Precio Mínimo: ${order!.getMinPrice()}`);
        }
    }
}
