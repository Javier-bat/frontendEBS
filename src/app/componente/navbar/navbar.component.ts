import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ItemPedido } from 'src/app/modelo/ItemPedido';
import { TokenPayload } from 'src/app/modelo/TokenPayload';
import { EventService } from 'src/app/servicio/event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cliente: string = "Cliente"
  public isMenuCollapsed = true;
  token: string;
  decodedToken: TokenPayload;
  items: ItemPedido[]
  //username:string;


  constructor(jwtHelper: JwtHelperService, private eventService: EventService) {
    this.token = localStorage.getItem('access_token')!;
    this.decodedToken = jwtHelper.decodeToken(this.token)
    this.items = JSON.parse(localStorage.getItem('carrito')!)
    if (this.items == null) {
      this.items = []
    }
    console.log(this.decodedToken);

  }

  ngOnInit(): void {
    this.eventService.myEventEmiter.subscribe(data => {
      var temp = JSON.parse(localStorage.getItem('carrito')!)
      if (Array.isArray(temp)) {
        this.items = temp
      } else {
        this.items = []
      }

    })
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    window.location.reload();
  }


}
