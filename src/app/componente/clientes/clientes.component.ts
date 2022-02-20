import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/modelo/Usuario';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  usuarios: Usuario[] = []
  formulario: FormGroup

  constructor(private fb: FormBuilder, private modalService: NgbModal, private userService: UsuarioService) {
    this.formulario = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),


    })
  }

  ngOnInit(): void {
    this.userService.getPersonal().subscribe(data => {
      this.usuarios = data as Usuario[]
    })
  }
  submit() {
    if (this.formulario.valid) {
      this.userService.savePersonal(this.formulario.getRawValue()).subscribe(data => {
        this.modalService.dismissAll()
        this.formulario.reset()
        this.userService.getPersonal().subscribe(data => {
          this.usuarios = data as Usuario[]
        })
      })
    }
  }
  open(content: any) {
    this.modalService.open(content)
  }

}
