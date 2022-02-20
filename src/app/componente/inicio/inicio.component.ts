import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenPayload } from 'src/app/modelo/TokenPayload';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  token: string;
  decodedToken: TokenPayload;

  constructor(jwtHelper: JwtHelperService) {
    this.token = localStorage.getItem('access_token')!;
    this.decodedToken = jwtHelper.decodeToken(this.token)
  }

  ngOnInit(): void {
  }

}
