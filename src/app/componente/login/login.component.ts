import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  error = "";

  constructor(private fb: FormBuilder, private service: UsuarioService, private router: Router) {
    this.formulario = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }
  submitForm() {
    console.log(this.formulario.getRawValue())
    if (this.formulario.valid) {
      this.service.login(this.formulario.getRawValue()).subscribe(data => {
        localStorage.setItem('access_token', data.token);
        window.location.reload();
        console.log(data.token)
      }, error => {
        console.log(error)
        this.error = error.error.error;

      })
    } else {
      this.error = "formulario invalido"
    }
  }

}
