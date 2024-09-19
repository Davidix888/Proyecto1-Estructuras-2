class Sell {
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

    public getMinPrice(): number {
        return this.minPrice;
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
}

class MinHeap{
    public heap: Sell[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public insert(order: Sell): void {
        if (this.n === this.heap.length - 1) this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order;
        this.swim(this.n);
    }

    private swim(i: number): void {
        let parent: number = Math.floor(i / 2);
        while (i > 1 && this.heap[parent].getMinPrice() > this.heap[i].getMinPrice()) {
            this.swap(parent, i);
            i = parent;
            parent = Math.floor(i / 2);
        }
    }

    public getMin(): Sell | null {
        if (this.n === 0) return null;
        const min = this.heap[1];
        this.swap(1, this.n);
        this.heap[this.n] = null!;
        this.n--;
        this.sink(1);
        return min;
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i;
            if (j < this.n && this.heap[j].getMinPrice() > this.heap[j + 1].getMinPrice()) j++;
            if (this.heap[i].getMinPrice() <= this.heap[j].getMinPrice()) break;
            this.swap(i, j);
            i = j;
        }
    }

    private swap(i: number, j: number): void {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    private resize(newSize: number): void {
        const newHeap = new Array(newSize);
        for (let i = 1; i <= this.n; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public show(): void {
        console.log("Ordenes de Venta:");
        for (let i = 1; i <= this.n; i++) {
            const order = this.heap[i];
            console.log(`Vendedor: ${order.getSeller()}, Compañía: ${order.getCompany()}, Cantidad: ${order.getQuantity()}, Precio mínimo: ${order.getMinPrice()}`);
        }
    }
}

// Ejemplo de uso
const sell1 = new Sell("Compañía A", 100, 50, "Vendedor1");
const sell2 = new Sell("Compañía B", 200, 40, "Vendedor2");
const sell3 = new Sell("Compañía C", 150, 45, "Vendedor3");

const sellHeap = new MinHeap(10);

sellHeap.insert(sell1);
sellHeap.insert(sell2);
sellHeap.insert(sell3);

sellHeap.show();

const bestOffer = sellHeap.getMin();
console.log(`La mejor oferta es de ${bestOffer?.getMinPrice()} de ${bestOffer?.getSeller()} para la compañía ${bestOffer?.getCompany()}`);
