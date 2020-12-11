import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroUsuarioService } from '../../services/registro-usuario.service';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-bici-usuario',
  templateUrl: './login-bici-usuario.component.html',
  styleUrls: ['./login-bici-usuario.component.css']
})
export class LoginBiciUsuarioComponent implements OnInit {
  private registerForm: FormGroup;

  constructor(private authService: RegistroUsuarioService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl()
    });
  }
  get primEmail() {
    return this.registerForm.get('username');
  }

  login() {

  }

  getUserPk() {

  }

}

