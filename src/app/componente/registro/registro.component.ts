import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/modelo/Cliente';
import { Domicilio } from 'src/app/modelo/Domicilio';
import { Usuario } from 'src/app/modelo/Usuario';
import { ClienteService } from 'src/app/servicio/cliente.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formulario: FormGroup;
  cliente = {} as Cliente;
  domicilio = {} as Domicilio;
  usuario = {} as Usuario;
  error = null;
  success: any = null;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.formulario = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      calle: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    //console.log(this.formulario.getRawValue());
    this.clienteService.registrar(this.formulario.getRawValue())
      .subscribe((data) => {
        console.log(data);
        this.success = data;
      }, (error) => {
        console.log(error);
        this.error = error.error
      });
  }

}
