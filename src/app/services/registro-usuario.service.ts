import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Token} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {

   djangoUrl = environment.urlBackDjango;
   javaUrl = environment.urlBackJava;

  constructor( private http: HttpClient) { }

  registerCompnay(password, confirm_password, name, nit, address): Observable<any> {
    return this.http.post(this.djangoUrl + '/api/company/register', {
      password: password,
      confirm_password: confirm_password, name: name, nit: nit, address: address
    });
  }

  registerCampUser(email, firstName, lastName, password, organization, edad): Observable<any> {
    return this.http.post(this.javaUrl + '/api/user/campus', {
      email: email, firstName: firstName, lastName: lastName, password: password, organization: organization, edad: edad
    });
  }

  registerbiciUser(email, firstName, lastName, password): Observable<any> {
    return this.http.post(this.javaUrl + '/api/user/biker', {
      email: email, firstName: firstName, lastName: lastName, password: password
    });
  }
  getUserRole(udUser): Observable<any> {

    let headers =new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json',
    'Authorization': 'SSWS 00EzyTTxrUeuxLi-fd99haJ6BIQL0M7G4jTZq1vTb8'});

    return this.http.get('https://dev-935634-admin.oktapreview.com/api/v1/users/' + udUser + '/groups', { 'headers': headers });
  }

  getRecorridos(): Observable<any> {
    let token = sessionStorage.getItem('token')

    let headers =new HttpHeaders({'Authorization': 'Bearer ' + token  });

    return this.http.get(this.javaUrl + 'tour', { 'headers': headers });
  }

}
