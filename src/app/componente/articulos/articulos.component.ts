import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Articulo } from 'src/app/modelo/Articulo';
import { RubroArticulo } from 'src/app/modelo/RubroArticulo';
import { ArticuloService } from 'src/app/servicio/articulo.service';
import { RubroArticuloService } from 'src/app/servicio/rubro-articulo.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = []
  rubros: RubroArticulo[] = [];
  errorRubro = ""
  formularioRubro: FormGroup;
  formularioArticulo: FormGroup;
  modoEdicion: boolean = false;

  constructor(private service: ArticuloService, private modalService: NgbModal, private fb: FormBuilder, private rubroService: RubroArticuloService, private articuloService: ArticuloService) {
    this.formularioRubro = this.fb.group({
      denominacion: new FormControl('', [Validators.required])
    })
    this.formularioArticulo = this.fb.group({

      denominacion: new FormControl('', [Validators.required]),
      precioCompra: new FormControl('', [Validators.required]),
      precioVenta: new FormControl('', [Validators.required]),
      stockActual: new FormControl('', [Validators.required]),
      unidadMedida: new FormControl('', [Validators.required]),
      idRubroArticulo: new FormControl('', [Validators.required]),
      esInsumo: new FormControl(false),
      id: new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.service.getArticulos().subscribe(data => {
      this.articulos = data as Articulo[];
    }, error => {
      console.log(error)
    })
    this.rubroService.getRubros().subscribe(data => {
      this.rubros = data as RubroArticulo[];
    }, error => {

    })
  }

  submitRubro(closeFunc: Function) {
    if (this.formularioRubro.valid) {
      this.rubroService.saveRubro(this.formularioRubro.getRawValue()).subscribe(data => {
        this.rubroService.getRubros().subscribe(data => {
          this.rubros = data as RubroArticulo[];
        }, error => {

        })
        closeFunc()
      }, error => { })
    }
  }

  submitArticulo(closeFunc: Function) {
    if (this.formularioArticulo.valid) {
      if (this.modoEdicion) {
        this.articuloService.updateArticulo(this.formularioArticulo.getRawValue()).subscribe(data => {
          this.service.getArticulos().subscribe(data => {
            this.articulos = data as Articulo[];
          }, error => {
            console.log(error)
          })
          closeFunc()
        }, error => {

        });
      } else {
        this.articuloService.saveArticulo(this.formularioArticulo.getRawValue()).subscribe(data => {
          this.service.getArticulos().subscribe(data => {
            this.articulos = data as Articulo[];
          }, error => {
            console.log(error)
          })
          closeFunc()
        }, error => {

        });
      }
      this.formularioArticulo.reset()


    } else {
      console.log("invalido");

    }
  }

  open(content: any) {
    this.formularioArticulo.reset()
    this.modalService.open(content);
    this.modoEdicion = false;
  }

  editarArticulo(content: any, articulo: any) {
    this.open(content)
    Object.keys(articulo).forEach((key, value) => {
      if (this.formularioArticulo.controls[key]) {
        this.formularioArticulo.controls[key].setValue(articulo[key])
      }

    })

    this.modoEdicion = true;
  }

}
