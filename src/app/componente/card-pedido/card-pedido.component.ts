import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pedido } from 'src/app/modelo/Pedido';

@Component({
  selector: 'app-card-pedido',
  templateUrl: './card-pedido.component.html',
  styleUrls: ['./card-pedido.component.css']
})
export class CardPedidoComponent implements OnInit {
  @Input() pedido : Pedido = new Pedido();
  @Output() verFacturaEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  verFactura(idPedido: any){
    this.verFacturaEvent.emit((idPedido).toString())
  }

}
