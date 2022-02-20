import { EnumType } from "typescript";
import { Cliente } from "./Cliente";
import { DetallePedido } from "./DetallePedido";

export class Pedido {
    id: number = 0; 
    fecha: Date = new Date();
    numero: number = 0;
    estado: string = "";
    horaEstimadaFin: Date = new Date();
    tipoEnvio: string = "";
    Cliente: Cliente = new Cliente();
    DetallePedidos: DetallePedido[] = [];
}