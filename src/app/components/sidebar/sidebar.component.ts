import { Component, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { LDFlagSet, LDClient, initialize } from 'launchdarkly-js-client-sdk';


declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ECOEMPRESA_ROUTES: RouteInfo[] = [
  { path: '/CampusBici/maps', title: 'Mapa de Rendimiento', icon: 'location_on', class: '' },
  { path: '/EcoEmpresa/alquiler', title: 'Alquiler de Bici', icon: 'dashboard', class: '' },
  { path: '/EcoEmpresa/registro-metas', title: 'Registrar Metas', icon: 'person', class: '' },
  { path: '/EcoEmpresa/graficos', title: 'Mis Estadisticas', icon: 'dashboard', class: '' },
  { path: '/EcoEmpresa/logOut', title: 'Cerrar Sesión', icon: 'person', class: '' }, //TODO CAMBIAR PATH

];

export const ESTUDIANTE_ROUTES: RouteInfo[] = [
  { path: '/CampusBici/maps', title: 'Mapa de Rendimiento', icon: 'location_on', class: '' },
  { path: '/CampusBici/user-profile', title: 'Perfil de Usuario', icon: 'person', class: '' },
  { path: '/CampusBici/alquiler', title: 'Alquiler de Bici', icon: 'dashboard', class: '' },
  { path: '/CampusBici/logOut', title: 'Cerrar Sesión', icon: 'person', class: '' }, //TODO CAMBIAR PATH
];

export const BICIUSUARIO_ROUTES: RouteInfo[] = [
  { path: '/BiciUsuario/maps', title: 'Realizar pedido', icon: 'dashboard', class: '' },
  { path: '/BiciUsuario/alquiler', title: 'Inventario', icon: 'dashboard', class: '' },
  { path: '/BiciUsuario/graficos', title: 'Mis Estadisticas', icon: 'dashboard', class: '' },
  { path: '/BiciUsuario/user-profile', title: 'Perfil de Usuario', icon: 'person', class: '' },
  { path: '/BiciUsuario/logOut', title: 'Cerrar Sesssión', icon: 'person', class: '' }, //TODO CAMBIAR PATH
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  ldclient: LDClient;
  flags: LDFlagSet;
  constructor(private router: Router) { }

  ngOnInit() {
    let user = {
      "key": "c.cordobac@uniandes.edu.co"
    };
    this.ldclient = initialize('5eacac70bd0c3a0a90544a60', user);
    this.ldclient.on('ready', () => {
      this.setFlags();
    });
  }


  setFlags() {
    //console.log('SET FLASGS');
    let product: String;
    let mapa: boolean;
    let estadisticas: boolean;
    let metas: boolean;
    let perfil: boolean;
    let alquiler: boolean;
    this.flags = this.ldclient.allFlags();
    product = this.flags['menu'];
    //console.log('PROD! ' + product);
    mapa = this.flags['mapa'];
    estadisticas = this.flags['estadisticas'];
    metas = this.flags['registro-metas'];
    perfil = this.flags['perfil-usuario'];
    alquiler = this.flags['alquiler'];
    if (product === 'None') {
      const CUSTOM_ROUTES: RouteInfo[] = [];

      if (mapa) {
        CUSTOM_ROUTES.push({ path: '/BiciUsuario/maps', title: 'Mapa de Rendimiento', icon: 'location_on', class: '' });
      }
      if (estadisticas) {
        CUSTOM_ROUTES.push({ path: '/BiciUsuario/graficos', title: 'Mis Estadisticas', icon: 'dashboard', class: '' });
      }
      if (metas) {
        CUSTOM_ROUTES.push({ path: '/BiciUsuario/registro-metas', title: 'Registrar Metas', icon: 'person', class: '' });
      }
      if (perfil) {
        CUSTOM_ROUTES.push({ path: '/BiciUsuario/user-profile', title: 'Perfil de Usuario', icon: 'person', class: '' }); //TODO CAMBIAR PATH
      }
      if (alquiler) {
        CUSTOM_ROUTES.push(
          { path: '/BiciUsuario/alquiler', title: 'Alquiler de Bici', icon: 'dashboard', class: '' });
      }
      CUSTOM_ROUTES.push({ path: '/BiciUsuario/logOut', title: 'Cerrar Sesssión', icon: 'person', class: '' }),
      this.menuItems = CUSTOM_ROUTES.filter(menuItem => menuItem);

    } else {
      if (product === 'EcoEmpresa') {
        this.menuItems = ECOEMPRESA_ROUTES.filter(menuItem => menuItem);
      } else if (product === 'CampusBici') {
        this.menuItems = ESTUDIANTE_ROUTES.filter(menuItem => menuItem);
      } else {
        this.menuItems = BICIUSUARIO_ROUTES.filter(menuItem => menuItem);
      }
    }
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
