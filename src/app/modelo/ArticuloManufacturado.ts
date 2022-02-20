import { ArticuloManufacturadoDetalle } from "./ArticuloManufacturadoDetalle";

export class ArticuloManufacturado {
    id: number = 0;
    denominacion: string = '';
    precioVenta: number = 0;
    tiempoEstimadoCocina: number = 0
    ArticuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = []
}