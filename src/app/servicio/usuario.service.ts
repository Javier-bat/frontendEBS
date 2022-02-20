import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResult } from '../modelo/LoginResult';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<LoginResult>("http://localhost:3000/login", data);
  }
  getPersonal() {
    return this.http.get("http://localhost:3000/personal")
  }
  savePersonal(data: any) {
    return this.http.post("http://localhost:3000/personal", data);
  }
}
