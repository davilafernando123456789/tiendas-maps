import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/users/login/login.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { EditarTiendaComponent } from './pages/tiendas/editar-tiendas/editar-tiendas.component';
import { ListarTiendasComponent } from './pages/tiendas/listar-tiendas/listar-tiendas.component';
import { VerTiendasComponent } from './pages/tiendas/ver-tiendas/ver-tiendas.component';
import { CrearTiendasComponent } from './pages/tiendas/crear-tiendas/crear-tiendas.component';
import { VerTiendasPorDistritoComponent } from './pages/tiendas/ver-tiendas-por-distrito/ver-tiendas-por-distrito.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    ListarProductosComponent,
    CrearProductosComponent,
    NavbarComponent,
    EditarProductosComponent,
    TiendasComponent,
    EditarTiendaComponent,
    ListarTiendasComponent,
    VerTiendasComponent,
    CrearTiendasComponent,
    VerTiendasPorDistritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
