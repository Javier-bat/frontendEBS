import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pedido } from 'src/app/modelo/Pedido';

@Component({
  selector: 'app-card-pedido-cocina',
  templateUrl: './card-pedido-cocina.component.html',
  styleUrls: ['./card-pedido-cocina.component.css']
})
export class CardPedidoCocinaComponent implements OnInit {
  @Input() pedido : Pedido = new Pedido();
  @Output() cambioEstadoEvent = new EventEmitter<string>();
  @Output() cambioHoraEstimadaEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  cambiarEstadoPedido(){
    this.cambioEstadoEvent.emit((this.pedido.id).toString())
  }

  cambiarHoraEstimada(){
    this.cambioHoraEstimadaEvent.emit((this.pedido.id).toString())
  }

}
