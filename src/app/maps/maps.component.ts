import { Component, OnInit } from '@angular/core';
import{ MapsService} from './../services/maps.service';
import { PushPin} from './../interfaces/puspin.interface';
import {Router} from '@angular/router';
import { async } from '@angular/core/testing';
import { element } from 'protractor';
import Swal from "sweetalert2";

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

    pins: Array<PushPin>;
    flag: any;
    currentURL: any;

  constructor(private router: Router, private _mapService: MapsService) {
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
    console.log(`Flag --> ${this.flag}`);
    var bog = new google.maps.LatLng(4.616620, -74.070874);
    var mapOptions = {
        zoom: 13,
        center: bog,
        scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]
    };


    // navigator.geolocation.getCurrentPosition(position => {
    //     this.center = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //     }
    // })


    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    this._mapService.GetCoordinates(this.flag)
        .subscribe((markers: Array<PushPin>) =>  {
            console.log(`Markers --> ${markers}`);

            if (!markers.length) {
                return [];
            }else{
                this.pins = markers;
                this.pins.forEach(infor =>{
                    let _pos = new google.maps.LatLng(infor.latitude, infor.longitude);
                    
                    let marker = new google.maps.Marker({
                        position: _pos,
                        //title: "Hello World!",
                        draggable: false,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    });
                    marker.setMap(map);
                });
            }
            
        }, error => {
            console.log('Error getting markers --> ', error);
        });

        //this._mapService.GetCoordinates(this.flag)
        //     .forEach(infor =>{
        //         let _pos = new google.maps.LatLng(infor.lat, infor.long);
        //         let marker = new google.maps.Marker({
        //             position: _pos,
        //             //title: "Hello World!",
        //             draggable: true,
        //             icon: infor.icon
        //         });
        //         marker.setMap(map);
        // })
  }

    pedir() {
        Swal.fire('Success!', 'Su pedido ha sido registrado, se le notificara cuando sea despachado!', 'success')
    }
}
