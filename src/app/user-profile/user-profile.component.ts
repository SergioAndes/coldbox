import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  currentURL: any;
  flag: any;
  token: any;
  userId: any;
  user: any;
  userForm: FormGroup;
  isReadOnly: boolean;

  constructor(private authService: UsuarioService) { 
    this.SetFlag();
  }

  SetFlag(){
    this.currentURL = window.location.href;
    
    //Set flag to consume endpoint
    if (this.currentURL.includes('CampusBici')) {
        this.flag = 1;
    }
    if (this.currentURL.includes('EcoEmpresa')) {
        this.flag = 3;
    }
    if (this.currentURL.includes('BiciUsuario')) {
        this.flag = 2;
    }
  }

  ngOnInit() {
    //console.log(`Flag --> ${this.flag}`);
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('idUser');
    // console.log('token :' + this.token);
    //console.log(`User id: ${this.userId}`)

    this.userForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null)
    });


    this.authService.getUser(this.userId).subscribe(data => {
      this.user = data.profile;
      //console.log(`User ---> ${JSON.stringify(this.user)}`)
      this.userForm.patchValue({
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        phone: this.user.mobilePhone
      });
      this.userForm.controls['email'].disable({onlySelf: true});
    })
  }

}
