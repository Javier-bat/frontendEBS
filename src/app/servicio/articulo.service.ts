import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient) {

  }

  getInsumos() {
    return this.http.get("http://localhost:3000/articulo/insumo");
  }

  getArticulos() {
    return this.http.get("http://localhost:3000/articulo");
  }
  saveArticulo(data: any) {
    return this.http.post("http://localhost:3000/articulo", data);
  }
  updateArticulo(data: any) {
    return this.http.patch("http://localhost:3000/articulo/" + data['id'], data);
  }
}
