import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Factura } from 'src/app/modelo/Factura';
import { Pedido } from 'src/app/modelo/Pedido';
import { TokenPayload } from 'src/app/modelo/TokenPayload';
import { FacturaService } from 'src/app/servicio/factura.service';
import { PedidoService } from 'src/app/servicio/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  factura: Factura = new Factura();
  modalRef: any;
  token: string;
  decodedToken: TokenPayload;

  constructor(private PedidoService: PedidoService, private facturaService: FacturaService, private modalService: NgbModal, jwtHelper: JwtHelperService) {
    this.token = localStorage.getItem('access_token')!;
    this.decodedToken = jwtHelper.decodeToken(this.token)
    this.PedidoService.getPedidos().subscribe(data => {
      this.pedidos = data as Pedido[];
    }, error => console.log(error))
  }

  ngOnInit(): void {
    this.PedidoService.getPedidosUsuarios(this.decodedToken.idCliente).subscribe(data => {
      this.pedidos = data as Pedido[]
    })
  }

  abrirModalFactura($event: string, content: any) {
    let idPedido = parseInt($event)

    this.facturaService.getFacturaPorPedido(idPedido).subscribe(data => {
      this.factura = data as Factura;
      this.modalRef = this.modalService.open(content);
    }, error => console.log(error))
  }

  cerrarModal() {
    this.factura = new Factura();
  }

}
