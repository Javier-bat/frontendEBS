import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../modelo/Pedido';
import { PedidoService } from '../../servicio/pedido.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FacturaService } from 'src/app/servicio/factura.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {
  pedidosActuales: Pedido[] = [];
  formularioCambioHora: FormGroup;
  modalRef : any;

  constructor(private service: PedidoService,private facturaService: FacturaService, private modalService: NgbModal, private fb: FormBuilder) { 
    this.formularioCambioHora = this.fb.group({
      id: new FormControl('', [Validators.required]),
      horaEstimadaFin: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.service.getPedidosActuales().subscribe(data => {
      this.pedidosActuales = data as Pedido[];
    }, error => {
      console.log(error)
    })
  }

  filtrarPedidosPorEstado(estado : string) {
    let pedidos = (this.pedidosActuales).filter(pedido => pedido.estado == estado);
    return pedidos;

  }

   actualizarEstadoPedido($event : string){
    let idPedido = $event, data = {id: idPedido, estado: ""};
    let pedido = this.pedidosActuales.filter(pedido => pedido.id == parseInt(idPedido));
    let estadoAnterior = pedido[0].estado;
    (estadoAnterior != "pendiente" ? data.estado="entregado" : data.estado="en preparacion");
    this.service.updatePedido(data).subscribe(data => {
      console.log("Actualizado correctamente");
      this.ngOnInit();
      if(estadoAnterior == "en preparacion"){
        this.facturaService.saveFactura(pedido[0]).subscribe(data => {
          console.log(data)
        })
      }
    })

  } 

  abrirModalHora($event: string,content: any){
    let idPedido = parseInt($event)
    this.formularioCambioHora.controls["id"].setValue(idPedido);
    this.modalRef = this.modalService.open(content);
  }

  actualizarHoraEstimada(){
    let data = this.formularioCambioHora.getRawValue()
    let nuevaHora = new Date((this.pedidosActuales.filter(pedido => pedido.id == parseInt(data.id))[0].horaEstimadaFin).toString())
    let hora = nuevaHora.getHours(), minutos = nuevaHora.getMinutes();
    let milisegundos = hora * 3600000 + minutos * 60000;
    let nuevaHoraNumeros = nuevaHora.getTime() - milisegundos;
    let horaString : string[] = (data.horaEstimadaFin).toString().split(":")
    let nuevosMilisegundos = parseInt(horaString[0]) * 3600000 + parseInt(horaString[1]) * 60000;
    nuevaHoraNumeros = nuevaHoraNumeros + nuevosMilisegundos;
    data.horaEstimadaFin = new Date(nuevaHoraNumeros);
    this.service.updatePedido(data).subscribe(data => {
      console.log("Actualizado correctamente");
      this.ngOnInit();
      this.modalRef.close()
    })

  }

}
