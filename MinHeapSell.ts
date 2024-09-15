class Sell {
    private offert: number;
    private buyer: string;
    private seller: string;

    constructor(offert: number, buyer: string, seller: string) {
        this.offert = offert;
        this.buyer = buyer;
        this.seller = seller;
    }

    public getOffert(): number {
        return this.offert;
    }

    public getBuyer(): string {
        return this.buyer;
    }

    public getSeller(): string {
        return this.seller;
    }
}

class MinHeap {
    public heap: Sell[]; 
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMin(): Sell | null {
        return this.heap[1] || null;
    }

    public insert(sell: Sell): void {
        if (this.n === this.heap.length - 1) this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = sell;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].getOffert() > this.heap[i].getOffert()) {
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
        this.heap = newHeap;
    }

    public getMin(): Sell | null {
        if (this.n === 0) return null;

        const min: Sell = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = null!;
        this.n--;
        this.sink(1);
        return min;
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i; 
            if (j < this.n && this.heap[j].getOffert() > this.heap[j + 1].getOffert()) j++;
            if (this.heap[i].getOffert() <= this.heap[j].getOffert()) break;

            const temp: Sell = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j;
        }
    }

    public show():void{
        console.log("Ofertas:")
        for(let i =1; i <= this.n; i++){
            const accion = this.heap[i];
            console.log("Comprador: " + accion.getBuyer() + " Vendedor: " + accion.getSeller() + " Monto: " + accion.getOffert());
        }
    }
}

// Ejemplo de uso:

// Creación de órdenes de venta
const sell1 = new Sell(300, "Comprador1", "Vendedor1");
const sell2 = new Sell(200, "Comprador2", "Vendedor2");
const sell3 = new Sell(400, "Comprador3", "Vendedor3");
const sell4 = new Sell(100, "Comprador4", "Vendedor4");

// Creación del montículo
const sellHeap = new MinHeap(10);

// Insertar ventas en el montículo
sellHeap.insert(sell1);
sellHeap.insert(sell2);
sellHeap.insert(sell3);
sellHeap.insert(sell4);

// Extraer la venta con el precio más bajo
const bestOffer = sellHeap.getMin();
console.log(`La mejor oferta es de ${bestOffer?.getOffert()} por ${bestOffer?.getSeller()}`);

sellHeap.show()
