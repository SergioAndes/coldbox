import { Component, OnInit } from '@angular/core';
import {RegistroUsuarioService} from "../services/registro-usuario.service";
import Swal from "sweetalert2";
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-okta-login',
  templateUrl: './okta-login.component.html',
  styleUrls: ['./okta-login.component.css']
})
export class OktaLoginComponent implements OnInit {

  constructor(private authService: RegistroUsuarioService, public oktaAuth: OktaAuthService, private router: Router ) { }

  async ngOnInit(): Promise<void> {
      if (await this.oktaAuth.isAuthenticated() == false) {
          this.router.navigate(['/BiciUsuario/login']);


      }else{

      this.oktaAuth.getAccessToken().then(datass => sessionStorage.setItem('token', datass));

      this.oktaAuth.getUser().then(datas => sessionStorage.setItem('idUser', datas.sub));
      
      this.oktaAuth.getUser().then(datas =>
            
          this.authService.getUserRole(datas.sub).subscribe(data => {
              //console.log(`DATA DE USUARIO --> ${JSON.stringify(datas)}`)  
              console.log('product', data[1].profile.name)

              let product = data[1].profile.name;
              if (product == 'bici_usuario') {
                  this.router.navigate(['/BiciUsuario']);
              } else if (product == 'bici_campus') {
                  this.router.navigate(['/CampusBici']);
              } else {
                  this.router.navigate(['/EcoEmpresa']);
              }
          }, error => {
              Swal.fire('Oops...', error, 'error');
              console.log('Error registrandose-> ', error);
          })
      );
      }
  }

}
