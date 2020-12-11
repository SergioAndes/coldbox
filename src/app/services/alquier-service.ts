import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { API_URL } from '../config/config';
import { Observable } from 'rxjs';
import { Alquiler } from 'app/alquiler/alquiler';
import { API_URL } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AlquilerService {

    constructor(private http: HttpClient) { }

    baseUrl='https://bicibff.herokuapp.com/bicibff/';
    alquilerUrl = this.baseUrl + 'rent/';
    bicicletasUrl = this.baseUrl + 'bicycle/';


    getBicicletas(): Observable<any> {
        //const usertToken = `Bearer ${sessionStorage.getItem('token')}`;
        //let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain'});
        return this.http.get<any>(this.bicicletasUrl/*, { 'headers': headers }*/);
    }

    postAlquiler(data: Alquiler): Promise<any> {
        const url = this.alquilerUrl;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201 || xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(`{"bicycle_id": ${data.bicycle_id}, "user_id":"${sessionStorage.getItem('idUser')}"}`);
        });
    }

    putAlquiler(data: Alquiler): Promise<any> {
        const url = this.alquilerUrl;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201 || xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.open('PUT', url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(`{"id": ${data.id}}`);
        });
    }

}