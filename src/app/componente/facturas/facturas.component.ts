import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/modelo/Factura';
import { FacturaService } from 'src/app/servicio/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  facturas: Factura[] = [];

  constructor(private facturaService: FacturaService) { 
  }

  ngOnInit(): void {
    this.facturaService.getFacturas().subscribe(data => {
      this.facturas = data as Factura[];
    }, error => {
      console.log(error)
    })
  }

}
