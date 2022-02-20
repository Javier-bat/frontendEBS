import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosManufacturadosComponent } from './componente/articulos-manufacturados/articulos-manufacturados.component';
import { ArticulosComponent } from './componente/articulos/articulos.component';
import { CarritoComponent } from './componente/carrito/carrito.component';
import { CartaComponent } from './componente/carta/carta.component';
import { ClientesComponent } from './componente/clientes/clientes.component';
import { CocinaComponent } from './componente/cocina/cocina.component';
import { FacturasComponent } from './componente/facturas/facturas.component';
import { InicioComponent } from './componente/inicio/inicio.component';
import { LoginComponent } from './componente/login/login.component';
import { PedidosComponent } from './componente/pedidos/pedidos.component';
import { RegistroComponent } from './componente/registro/registro.component';
import { ReportesComponent } from './componente/reportes/reportes.component';
import { AuthGuard } from './guard/auth-guard';

const routes: Routes = [
  { component: InicioComponent, path: '' },
  { component: RegistroComponent, path: 'Registro', canActivate: [AuthGuard] },
  { component: ArticulosComponent, path: 'Articulos', canActivate: [AuthGuard] },
  { component: ClientesComponent, path: 'Personal', canActivate: [AuthGuard] },
  { component: PedidosComponent, path: 'Pedidos', canActivate: [AuthGuard] },
  { component: CocinaComponent, path: 'Cocina', canActivate: [AuthGuard] },
  { component: CarritoComponent, path: 'Carrito', canActivate: [AuthGuard] },
  { component: CartaComponent, path: 'Carta', canActivate: [AuthGuard] },
  { component: ArticulosManufacturadosComponent, path: 'Manufacturados', canActivate: [AuthGuard] },
  { component: LoginComponent, path: 'Login', canActivate: [AuthGuard] },
  { component: FacturasComponent, path: 'Facturas', canActivate: [AuthGuard] },
  { component: ReportesComponent, path: 'Reportes', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
