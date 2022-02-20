import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../modelo/Pedido';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) {

  }

    getFacturas() {
        return this.http.get("http://localhost:3000/factura");
    }

    saveFactura(pedido: Pedido){
        let fecha = new Date(),total = 0;
        pedido.DetallePedidos.forEach(function(detalle,indice){
            total += detalle.subtotal;
        }) 
        let descuento = (pedido.tipoEnvio == "local" ? total * 0.1 : 0);
        total = total - descuento
        let data = {
            idPedido: pedido.id, fecha: fecha, montoDescuento: descuento, total: total 
        }
        return this.http.post("http://localhost:3000/factura/", data);
    } 

    getFacturaPorPedido(idPedido: any){
        return this.http.post("http://localhost:3000/factura/pedido", {idPedido: parseInt(idPedido)});
    }
}