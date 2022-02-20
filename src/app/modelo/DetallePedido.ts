import { Articulo } from "./Articulo";
import { ArticuloManufacturado } from "./ArticuloManufacturado";

export class DetallePedido {
    id : number = 0;
    cantidad: number = 0;
    subtotal: number = 0;
    Articulo: Articulo = new Articulo();
    ArticuloManufacturado: ArticuloManufacturado = new ArticuloManufacturado();
}