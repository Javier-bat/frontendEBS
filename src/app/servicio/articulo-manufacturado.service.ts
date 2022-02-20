import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtManufacturadoService {

  constructor(private http: HttpClient) { }

  getArtManufacturados() {
    return this.http.get("http://localhost:3000/articulo-manufacturado");
  }
  saveArtManufacturados(data: any) {
    return this.http.post("http://localhost:3000/articulo-manufacturado", data);
  }
  updateArtManufacturados(data: any) {
    return this.http.patch("http://localhost:3000/articulo-manufacturado/" + data['id'], data);
  }
}
