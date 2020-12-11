import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

   baseUrl = environment.urlBackJava;
   pins = 'assets/coord.json';
   token: any;

  constructor( private http: HttpClient) { 
    
  }

  GetPins() {
    //return this.http.get(this.pins).pipe(catchError(this.handleError));
    return [
        {
            "lat":4.629667, 
            "long":-74.071779, 
            "icon":"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }, 
        {
            "lat":4.618660, 
            "long":74.070438, 
            "icon":"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }, 
        {
            "lat":4.602973, 
            "long":-74.065228, 
            "icon":"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }
    ]
  }

  public GetToken(): string {
    return localStorage.getItem('token');
  }

  GetCoordinates(flag:string):Observable<any>{
    
    return this.http.get<any>(this.baseUrl + 'place/interesting/' + flag)
            .pipe(catchError(this.handleError));      
      
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

}
