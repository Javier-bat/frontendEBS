import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ReportesService {
    constructor(private http: HttpClient) {

    }
    
  getComidasMasPedidas(){
    return this.http.get("http://localhost:3000/reportes/comidasMasPedidas");
  }

  getIngresosPorPeriodo(data: any){
      return this.http.post("http://localhost:3000/reportes/ingresos",data)
  }

  getPedidosPorPeriodo(data: any){
    return this.http.post("http://localhost:3000/reportes/pedidos/periodo",data)
  }

  getPedidosPorCliente(data: any){
    return this.http.post("http://localhost:3000/reportes/pedidos/cliente",data)
  }

  getClientesPorPeriodo(data : any){
    return this.http.post("http://localhost:3000/reportes/cliente",data)
  }
}