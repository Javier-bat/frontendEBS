import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemPedido } from 'src/app/modelo/ItemPedido';
import { TokenPayload } from 'src/app/modelo/TokenPayload';
import { EventService } from 'src/app/servicio/event.service';
import { PedidoService } from 'src/app/servicio/pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  subtotal: number = 0;
  tiempoEstimado: number = 0;
  items: ItemPedido[]
  formulario: FormGroup
  token: string;
  decodedToken: TokenPayload;

  constructor(private eventService: EventService, private fb: FormBuilder, private modalService: NgbModal, jwtHelper: JwtHelperService, private service: PedidoService) {
    this.items = JSON.parse(localStorage.getItem('carrito')!)

    this.formulario = new FormGroup({
      tipoEnvio: new FormControl('', [Validators.required]),
    })
    this.token = localStorage.getItem('access_token')!;
    this.decodedToken = jwtHelper.decodeToken(this.token)
    if (this.items == null) {
      this.items = []
    }
    this.calcularSubtotal()
  }

  ngOnInit(): void {
    this.eventService.myEventEmiter.subscribe(data => {
      this.items = JSON.parse(localStorage.getItem('carrito')!)
      if (this.items == null) {
        this.items = []
      }
      this.calcularSubtotal()
    })

  }
  eliminar(item: ItemPedido) {
    var index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(this.items));
      this.eventService.emitir();
    }

  }
  abrirModal(content: any) {
    this.modalService.open(content)
  }
  calcularSubtotal() {
    var temp = 0;
    var tiempoTemp = 0;
    this.items.forEach((value, index) => {
      var parcial = value.cantidad * Number(value.itemCarta.precioVenta)
      if (value.itemCarta.tiempoEstimadoCocina) {
        tiempoTemp += value.itemCarta.tiempoEstimadoCocina
      }

      temp += Number(parcial)

    })
    this.tiempoEstimado = Number(tiempoTemp)
    this.subtotal = Number(temp)
  }
  submit() {
    if (this.formulario.valid) {
      var data: any = {};
      data.tipoEnvio = this.formulario.get("tipoEnvio")?.value;
      data.idCliente = this.decodedToken.idCliente;
      data.articulos = this.items as [];
      data.subtotal = this.subtotal
      data.tiempoEstimado = this.tiempoEstimado
      console.log(data)
      this.service.savePedido(data).subscribe((data) => {
        localStorage.removeItem("carrito")
        this.modalService.dismissAll()
        this.formulario.reset()
        this.eventService.emitir()
        this.subtotal = 0
      })
    }
  }

}
