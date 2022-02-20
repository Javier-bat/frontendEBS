import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RubroArticuloService {

  constructor(private http: HttpClient) { }

  getRubros() {
    return this.http.get("http://localhost:3000/rubro-articulo");
  }
  saveRubro(data: any) {
    return this.http.post("http://localhost:3000/rubro-articulo", data);
  }
}
