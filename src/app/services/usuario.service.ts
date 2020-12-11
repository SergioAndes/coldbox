import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {OktaAuthService} from "@okta/okta-angular";
import {Token} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   djangoUrl = environment.urlBackDjango;
   javaUrl = environment.urlBackJava;
   token = '';
   userId = '';

  constructor( public oktaAuth: OktaAuthService, private http: HttpClient) { 
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('idUser');
  }

  getUser(udUser): Observable<any> {
    
    let headers =new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json',
    'Authorization': 'SSWS 00EzyTTxrUeuxLi-fd99haJ6BIQL0M7G4jTZq1vTb8'});

    return this.http.get('https://dev-935634-admin.oktapreview.com/api/v1/users/' + udUser, { 'headers': headers });
  }

  UpdateUser(): Observable<any> {
    let token = sessionStorage.getItem('token')

    let headers =new HttpHeaders({'Authorization': 'Bearer ' + token  });

    return this.http.get(this.javaUrl + 'tour', { 'headers': headers });
  }

}
