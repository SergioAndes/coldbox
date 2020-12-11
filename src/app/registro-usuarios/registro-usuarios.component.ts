import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from "sweetalert2";
import {RegistroUsuarioService} from "../services/registro-usuario.service";

export interface Food {
  valor: string;
  id: number;
}


@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  public registerForm: FormGroup;
  currentURL = '';
  formtype = 0;


  foods: Food[] = [
    {valor: 'El bosque', id: 1},
    {valor: 'la jave', id: 2},
    {valor: 'los andes', id: 3}
  ];

  constructor(private router: Router, private authService: RegistroUsuarioService) { }

  ngOnInit(): void {

    this.currentURL = window.location.href;
    this.setFormType();
    this.setRegistrationForm();
    console.log('url', this.currentURL)
  }

  setFormType() {

    if (this.currentURL.includes('CampusBici')) {
      this.formtype = 1;
      console.log('fromr', this.formtype)
    }
    if (this.currentURL.includes('EcoEmpresa')) {
      this.formtype = 2;
      console.log('fromr', this.formtype)
    }
      if (this.currentURL.includes('BiciUsuario')) {
      this.formtype = 3;
      console.log('fromr', this.formtype)
    }

  }

  setRegistrationForm() {
    if (this.formtype == 1){

      this.registerForm = new FormGroup({
        password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
        fullName: new FormControl('', [Validators.required]),
        fullName2: new FormControl('', [Validators.required]),
        edad: new FormControl('', [Validators.required]),
        universidad: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    });
    }

    if (this.formtype == 2){

      this.registerForm = new FormGroup({
        password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
        password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
        fullName: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        nit: new FormControl('', [Validators.required]),
    });
    }

    if (this.formtype == 3){
      this.registerForm = new FormGroup({
        password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
        fullName2: new FormControl('', [Validators.required]),
        fullName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        cvv: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    }
  }




  get primEmail() {
    return this.registerForm.get('email');
  }
  get password1() {
    return this.registerForm.get('password1');
  }

    validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      console.log('Registro exisoso ', control);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
        }
      });
  }

    registerCompany() {
    if (this.registerForm.valid) {
      console.log('Registro exisoso ', 'sdsds');
      let password1 = this.registerForm.get('password1').value;
      let password2 = this.registerForm.get('password2').value;
      let fullName = this.registerForm.get('fullName').value;
      let address = this.registerForm.get('address').value;
      let nit = this.registerForm.get('nit').value;
      this.authService.registerCompnay(password1, password2, fullName, nit, address).subscribe(data => {
        console.log('Registro exisoso ', data);
        Swal.fire('Success...', 'Sera redirigido a la pagina de login para iniciar sesion', 'success');
        this.router.navigate(['/EcoEmpresa/login']);
      }, error => {
         Swal.fire('Oops...', error.error[0], 'error');
        console.log('Error registrandose-> ', error);
      });
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }


      registerCampusUser() {
    if (this.registerForm.valid) {
      console.log('Registro exisoso ', 'sdsds');
      let password1 = this.registerForm.get('password1').value;
      let fullName = this.registerForm.get('fullName').value;
      let fullName2 = this.registerForm.get('fullName2').value;
      let email = this.registerForm.get('email').value;
      let edad = this.registerForm.get('edad').value;
      let universidad = this.registerForm.get('universidad').value;

      this.authService.registerCampUser(email, fullName, fullName2, password1, universidad, edad).subscribe(data => {
        console.log('Registro exisoso ', data);
        Swal.fire('Success...', 'Sera redirigido a la pagina de login para iniciar sesion', 'success');
        this.router.navigate(['/CampuBici/login']);
      }, error => {
         Swal.fire('Oops...', 'error en el registro intente de nuevo', 'error');
        console.log('Error registrandose-> ', error);
      });
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }

  registerBiciUser() {
    if (this.registerForm.valid) {
      console.log('Registro exisoso ', 'sdsds');
      let password1 = this.registerForm.get('password1').value;
      let fullName = this.registerForm.get('fullName').value;
      let fullName2 = this.registerForm.get('fullName2').value;
      let email = this.registerForm.get('email').value;
      this.authService.registerbiciUser(email, fullName, fullName2, password1).subscribe(data => {
        console.log('Registro exisoso ', data);
        Swal.fire('Success...', 'Sera redirigido a la pagina de login para iniciar sesion', 'success');
        this.router.navigate(['/BiciUsuario/login']);
      }, error => {
         Swal.fire('Oops...', error.error.causes[0].summary, 'error');
        console.log('Error registrandose-> ', error);
      });
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }


  irALogin() {
    this.router.navigate(['EcoEmpresa/login']);
  }
}
