import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Articulo } from 'src/app/modelo/Articulo';
import { ArticuloManufacturado } from 'src/app/modelo/ArticuloManufacturado';
import { ArticuloManufacturadoDetalle } from 'src/app/modelo/ArticuloManufacturadoDetalle';
import { ArtManufacturadoService } from 'src/app/servicio/articulo-manufacturado.service';
import { ArticuloService } from 'src/app/servicio/articulo.service';

@Component({
  selector: 'app-articulos-manufacturados',
  templateUrl: './articulos-manufacturados.component.html',
  styleUrls: ['./articulos-manufacturados.component.css']
})
export class ArticulosManufacturadosComponent implements OnInit {
  articulos: ArticuloManufacturado[] = []
  articulosInternos: ArticuloManufacturadoDetalle[] = []
  insumos: Articulo[] = []
  errorRubro = ""
  modoEdicion: boolean = false;
  formulario: FormGroup;
  formularioInsumo: FormGroup;
  private modalRef: any;


  constructor(private secondServicio: ArtManufacturadoService, private modalService: NgbModal, private fb: FormBuilder, private articuloService: ArticuloService) {
    this.formulario = this.fb.group({
      id: new FormControl('', [Validators.required]),
      denominacion: new FormControl('', [Validators.required]),
      precioVenta: new FormControl('', [Validators.required]),
      tiempoEstimadoCocina: new FormControl('', [Validators.required])
    })
    this.formularioInsumo = this.fb.group({
      idArticulo: new FormControl(0, [Validators.required]),
      cantidad: new FormControl(0, [Validators.required])
    })
  }

  getData() {
    this.secondServicio.getArtManufacturados().subscribe(data => {
      this.articulos = data as ArticuloManufacturado[]
    })
  }

  ngOnInit(): void {

    this.getData()
    this.articuloService.getInsumos().subscribe(data => {
      this.insumos = data as Articulo[];
    }, error => {

    })
  }
  cerrar(content: any) {
    //this.content.close()
  }
  abrirModal(content: any) {

    this.modalRef = this.modalService.open(content);
  }
  open(content: any) {
    this.formulario.reset()
    this.articulosInternos = []
    this.modalService.open(content);
  }
  submitArticuloManufacturado() {
    var data = this.formulario.getRawValue();
    data.articulos = this.articulosInternos;
    if (this.modoEdicion) {
      this.secondServicio.updateArtManufacturados(data).subscribe(data => {
        this.formulario.reset();
        this.formularioInsumo.reset();
        this.modalService.dismissAll();
        this.modoEdicion = false
        this.getData()
      })
    } else {
      this.secondServicio.saveArtManufacturados(data).subscribe(data => {
        this.formulario.reset();
        this.formularioInsumo.reset();
        this.modalService.dismissAll()
        this.getData()
      })
    }
  }
  eliminarIngrediente(ingrediente: ArticuloManufacturadoDetalle) {
    var temp = this.articulosInternos.findIndex((element) => element.idArticulo == ingrediente.idArticulo)
    console.log(this.articulosInternos)
    console.log(temp)
    this.articulosInternos.splice(temp, 1);
  }
  submitIngrediente(c: any) {
    var ss = this.formularioInsumo.getRawValue();
    var temp = this.insumos.findIndex((element) => element.id == ss.idArticulo)
    ss.denominacion = this.insumos[temp]['denominacion']
    this.articulosInternos.push(ss);
    this.formularioInsumo.reset()
    this.modalRef.close()
  }
  editarArticulo(articulo: ArticuloManufacturado, modal: any) {

    this.open(modal)
    this.modoEdicion = true
    Object.keys(articulo).forEach((key, value) => {
      if (this.formulario.controls[key]) {
        this.formulario.controls[key].setValue((articulo as any)[key])
      }
    })
    this.articulosInternos = articulo.ArticuloManufacturadoDetalles
    console.log(this.articulosInternos)
  }

}
