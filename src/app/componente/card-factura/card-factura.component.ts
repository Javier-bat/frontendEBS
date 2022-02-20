import { Component, Input, OnInit } from '@angular/core';
import { Factura } from 'src/app/modelo/Factura';

@Component({
  selector: 'app-card-factura',
  templateUrl: './card-factura.component.html',
  styleUrls: ['./card-factura.component.css']
})
export class CardFacturaComponent implements OnInit {
  @Input() factura: Factura = new Factura();

  constructor() { }

  ngOnInit(): void {
  }

}
