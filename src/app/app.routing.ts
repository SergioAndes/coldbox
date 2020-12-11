import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {RegistroUsuariosComponent} from './registro-usuarios/registro-usuarios.component';
import {LoginEcoEmpresaComponent} from "./login/login-eco-empresa/login-eco-empresa.component";
import {LoginCampusBiciComponent} from "./login/login-campus-bici/login-campus-bici.component";
import {LoginBiciUsuarioComponent} from "./login/login-bici-usuario/login-bici-usuario.component";
import {GraficasCampusBiciComponent} from './graficas/graficas-campus-bici/graficas-campus-bici.component';
import {OktaLoginComponent} from "./okta-login/okta-login.component";
import {OktaCallbackComponent, OktaLoginRedirectComponent} from "@okta/okta-angular";
import {LogOutComponent} from "./log-out/log-out.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
    {path: 'CampusBici/registro', component: RegistroUsuariosComponent},
    {path: 'EcoEmpresa/registro', component: RegistroUsuariosComponent},
    {path: 'BiciUsuario/registro', component: RegistroUsuariosComponent},
    {path: '', component: DashboardComponent},
    {path: 'login', component: LoginEcoEmpresaComponent},
    {path: 'grafica', component: GraficasCampusBiciComponent},
    {path: 'route', component: OktaLoginComponent},
    {path: 'implicit/callback', component: OktaCallbackComponent},
    {
        path: 'CampusBici',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]
    },
    {
        path: 'EcoEmpresa',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]
    },
    {
        path: 'BiciUsuario',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]
    },
    {
        path: '',
        redirectTo: 'route',
        pathMatch: 'full',
    }/*
  , {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }*/
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
