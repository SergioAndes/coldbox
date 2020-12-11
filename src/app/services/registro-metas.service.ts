import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { API_URL } from '../config/config';
import { Observable } from 'rxjs';
import { Alquiler } from 'app/alquiler/alquiler';
import { Meta } from 'app/registrometas/meta';
import { API_URL } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegistroMetasService {

    constructor(private http: HttpClient) { }

    registroMetaUrl = 'https://bicibff.herokuapp.com/bicibff/tour';


    postMeta(data: Meta): Promise<any> {
        return new Promise((resolve, reject) => {
            let token = sessionStorage.getItem('token'); 
            const xhr = new XMLHttpRequest();
            let body = `{"distance": ${data.km_recorridos}, "time":${data.tiempo}, "averageVelocity":${data.velocidad_promedio}, "activityDate":"${data.fecha}", "startLocation":"${data.coordenadas_inicio}", "endLocation":"${data.coordenadas_fin}"}`;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201 || xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.open('POST', this.registroMetaUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
            xhr.send(body);
        });
    }

}