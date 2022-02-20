import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemCarta } from 'src/app/modelo/ItemCarta';
import { ItemPedido } from 'src/app/modelo/ItemPedido';
import { Pedido } from 'src/app/modelo/Pedido';
import { CartaService } from 'src/app/servicio/carta.service';
import { EventService } from 'src/app/servicio/event.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  itemsCarta: ItemCarta[] = [];
  artSeleccionado: ItemCarta = new ItemCarta()
  formulario: FormGroup
  constructor(private service: CartaService, private modalService: NgbModal, private fb: FormBuilder, private eventService: EventService) {
    this.formulario = new FormGroup({
      cantidad: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getData().subscribe(data => {
      this.itemsCarta = data as ItemCarta[];
    })
  }
  submit() {
    var valueExists = false;
    var tempItem: ItemPedido = new ItemPedido();
    tempItem.cantidad = this.formulario.get("cantidad")?.value
    tempItem.itemCarta = this.artSeleccionado
    var items: ItemPedido[] = JSON.parse(localStorage.getItem('carrito')!)
    console.log(items)
    if (items == null) {
      items = [];
    }
    items.forEach((value, index) => {
      console.log(tempItem.itemCarta.id)
      if (value.itemCarta.denominacion == tempItem.itemCarta.denominacion) {
        value.cantidad = Number(value.cantidad) + Number(tempItem.cantidad);
        valueExists = true;
      }
    })
    if (!valueExists) {
      items.push(tempItem)
    }

    localStorage.setItem("carrito", JSON.stringify(items))
    this.eventService.emitir()
    this.modalService.dismissAll()
    this.formulario.reset()
  }
  abrirModalAgregar(art: ItemCarta, content: any) {
    this.artSeleccionado = art
    this.modalService.open(content)
  }

}
