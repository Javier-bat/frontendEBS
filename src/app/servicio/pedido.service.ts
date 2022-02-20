import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) {

  }

  getPedidosActuales() {
    return this.http.get("http://localhost:3000/pedido/actuales");
  }

  getPedidos() {
    return this.http.get("http://localhost:3000/pedidos");
  }
  getPedidosUsuarios(id: any) {
    return this.http.get("http://localhost:3000/pedido/" + id);
  }

  updatePedido(data: any) {
    return this.http.patch("http://localhost:3000/pedido/" + data['id'], data);
  }
  savePedido(data: any) {
    return this.http.post("http://localhost:3000/pedido", data);
  }
}