import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { LoginComponent } from './pages/users/login/login.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { ListarTiendasComponent } from './pages/tiendas/listar-tiendas/listar-tiendas.component';
import { EditarTiendaComponent } from './pages/tiendas/editar-tiendas/editar-tiendas.component';
import { CrearTiendasComponent } from './pages/tiendas/crear-tiendas/crear-tiendas.component';
import { VerTiendasComponent } from './pages/tiendas/ver-tiendas/ver-tiendas.component';
import { VerTiendasPorDistritoComponent } from './pages/tiendas/ver-tiendas-por-distrito/ver-tiendas-por-distrito.component';


const routesInicio: Routes = [
  { path: '', component: LoginComponent },
  { path: 'crear-usuario', component: CreateUserComponent },
  { path: 'listar-productos', component: ListarProductosComponent },
  { path: 'crear-productos', component: CrearProductosComponent },
  { path: 'editar-producto/:id', component: EditarProductosComponent },
  { path: 'listar-tiendas', component: ListarTiendasComponent },
  { path: 'editar-tienda/:id', component: EditarTiendaComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'crear-tienda', component: CrearTiendasComponent },
  { path: 'ver-tienda/:id', component: VerTiendasComponent },
  { path: 'ver-tiendas-distrito/:distrito', component: VerTiendasPorDistritoComponent },

  { path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
