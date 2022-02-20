import { Pedido } from "./Pedido";

export class Factura {
    id: number = 0;
    fecha: Date = new Date();
    numero: number = 0;
    montoDescuento: number = 0;
    total: number = 0;
    Pedido: Pedido = new Pedido();

}