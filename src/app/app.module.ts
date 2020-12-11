import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
//import { TypographyComponent } from './typography/typography.component';
//import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
//import { NotificationsComponent } from './notifications/notifications.component';
//import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MaterialModule } from './material.module';
import { ModalComponent } from './modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { LoginComponent } from './login/login.component';
import { LoginCampusBiciComponent } from './login/login-campus-bici/login-campus-bici.component';
import { LoginBiciUsuarioComponent } from './login/login-bici-usuario/login-bici-usuario.component';
import { LoginEcoEmpresaComponent } from './login/login-eco-empresa/login-eco-empresa.component';
import { GraficasCampusBiciComponent } from './graficas/graficas-campus-bici/graficas-campus-bici.component';
import { GraficasEcoEmpresaComponent } from './graficas/graficas-eco-empresa/graficas-eco-empresa.component';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import { OktaLoginComponent } from './okta-login/okta-login.component';
import { LogOutComponent } from './log-out/log-out.component';

const oktaConfig = {
  issuer: 'https://dev-935634.oktapreview.com/oauth2/default',
  clientId: '0oaqqw39l4Qi66E6F0h7',
  redirectUri: 'http://localhost:4200/implicit/callback',
  pkce: true
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    OktaAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ModalComponent,
    RegistroUsuariosComponent,
    LoginComponent,
    LoginCampusBiciComponent,
    LoginBiciUsuarioComponent,
    LoginEcoEmpresaComponent,
    OktaLoginComponent,
    LogOutComponent

  ],
  providers: [{ provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
