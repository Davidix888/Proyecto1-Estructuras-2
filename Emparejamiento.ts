import { BuyOrder, MaxHeap } from './BuyOrderclass';
import { Sell, MinHeap } from './SellOrderclass';

export class OrderMatcher {
    private sellHeap: MinHeap;
    private buyHeap: MaxHeap;
    private transactionHistory: string[];

    constructor() {
        this.sellHeap = new MinHeap(10);
        this.buyHeap = new MaxHeap(10);
        this.transactionHistory = [];
    }

    // Agregar una orden de venta
    public addSellOrder(order: Sell): void {
        this.sellHeap.insert(order);
        this.matchOrders();
    }

    // Agregar una orden de compra
    public addBuyOrder(order: BuyOrder): void {
        this.buyHeap.insert(order);
        this.matchOrders();
    }


    private matchOrders(): void {
        let bestBuy = this.buyHeap.checkMax();
        let bestSell = this.sellHeap.checkMin();

        while (bestBuy && bestSell) {
            // Revisamos que el nombre de la empresa concuerde con el de la venta y la compra al igual que el precio
            if (bestBuy.getCompany() === bestSell.getCompany() && bestSell.getOffert() <= bestBuy.getMaxPrice()) {
                const transactionQuantity = Math.min(bestBuy.getQuantity(), bestSell.getQuantity());
                const transactionPrice = bestSell.getOffert();
                const totalTransaction = transactionQuantity * transactionPrice; // Calcular el total de la transacción

                // Emparejamiento de las ordenes, tambien aqui restamos las acciones a la orden de venta para la de compra
                console.log(`Emparejando ${transactionQuantity} acciones de ${bestBuy.getCompany()} a ${transactionPrice} por accion`);
                bestBuy.reduceQuantity(transactionQuantity);
                bestSell.reduceQuantity(transactionQuantity);

                //Registro de la transaccion
                this.recordTransaction(bestBuy, bestSell, transactionQuantity, transactionPrice, totalTransaction);

                // Revisamos si la orden esta completada
                if (bestBuy.getQuantity() == 0) {
                    this.buyHeap.removeMax();
                    bestBuy = this.buyHeap.checkMax();
                }

                if (bestSell.getQuantity() == 0) {
                    this.sellHeap.removeMin();
                    bestSell = this.sellHeap.checkMin();
                }
            } else {
                // Si no concuerda el precio termina el while
                break;
            }
        }
    }

    // Registrar la transaccion en el historial
    private recordTransaction(buyOrder: BuyOrder, sellOrder: Sell, quantity: number, price: number, total: number): void {
        this.transactionHistory.push(
            `Transaccion de ${quantity} acciones de ${buyOrder.getCompany()} a ${price} por accion del comprador ${buyOrder.getBuyer()} al vendedor ${sellOrder.getSeller()} por un total de: ${total}`
        );
    }

    // Mostrar el historial de transacciones
    public showTransactions(): void {
        console.log("\n    Historial de Transacciones   ");
        if (this.transactionHistory.length === 0) {
            console.log("No se han realizado transacciones");
        } else {
            this.transactionHistory.forEach(transaction => console.log(transaction));
        }
    }

    // Mostrar órdenes actuales en los heaps
    public showCurrentOrders(): void {
        console.log("\n    Órdenes Restantes   ");
        this.sellHeap.show(); 
        this.buyHeap.show(); 
    }
}


const orderMatcher = new OrderMatcher();

// Ordenes de ventas
orderMatcher.addSellOrder(new Sell("Apple", 100, 50, "Luis"));    //Empresa, Cantidad Acciones, Precio, Vendedor
orderMatcher.addSellOrder(new Sell("Apple", 50, 55, "Carlos"));   
orderMatcher.addSellOrder(new Sell("Google", 200, 65, "Ana"));    
orderMatcher.addSellOrder(new Sell("Amazon", 300, 70, "Andres"));  
orderMatcher.addSellOrder(new Sell("Amazon", 100, 75, "Juan"));    

// Ordenes de compras
orderMatcher.addBuyOrder(new BuyOrder("Apple", 120, 55, "Pablo"));  
orderMatcher.addBuyOrder(new BuyOrder("Apple", 40, 60, "David"));    
orderMatcher.addBuyOrder(new BuyOrder("Google", 200, 70, "Mario"));  
orderMatcher.addBuyOrder(new BuyOrder("Amazon", 300, 80, "Jose"));   
orderMatcher.addBuyOrder(new BuyOrder("Amazon", 50, 75, "Miguel"));    

// Historial de transacciones
orderMatcher.showTransactions();
//Ordenes restantantes que no se completaron
orderMatcher.showCurrentOrders();

