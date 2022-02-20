import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './componente/navbar/navbar.component';
import { InicioComponent } from './componente/inicio/inicio.component';
import { RegistroComponent } from './componente/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticulosComponent } from './componente/articulos/articulos.component';
import { ClientesComponent } from './componente/clientes/clientes.component';
import { LoginComponent } from './componente/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guard/auth-guard';
import { ArticulosManufacturadosComponent } from './componente/articulos-manufacturados/articulos-manufacturados.component';
import { PedidosComponent } from './componente/pedidos/pedidos.component';
import { CocinaComponent } from './componente/cocina/cocina.component';
import { CartaComponent } from './componente/carta/carta.component';
import { CarritoComponent } from './componente/carrito/carrito.component';
import { CardPedidoCocinaComponent } from './componente/card-pedido-cocina/card-pedido-cocina.component';
import { CardFacturaComponent } from './componente/card-factura/card-factura.component';
import { FacturasComponent } from './componente/facturas/facturas.component';
import { CardPedidoComponent } from './componente/card-pedido/card-pedido.component';
import { ReportesComponent } from './componente/reportes/reportes.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComidasComponent } from './componente/chart-comidas/chart-comidas.component';
import { ChartIngresosComponent } from './componente/chart-ingresos/chart-ingresos.component';
import { ChartPedidosComponent } from './componente/chart-pedidos/chart-pedidos.component';
import { ChartPedidosClienteComponent } from './componente/chart-pedidos-cliente/chart-pedidos-cliente.component';
import { ChartClientesComponent } from './componente/chart-clientes/chart-clientes.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    RegistroComponent,
    ArticulosComponent,
    ClientesComponent,
    LoginComponent,
    ArticulosManufacturadosComponent,
    PedidosComponent,
    CocinaComponent,
    CardPedidoCocinaComponent,
    CartaComponent,
    CarritoComponent,
    FacturasComponent,
    CardFacturaComponent,
    CardPedidoComponent,
    ReportesComponent,
    ChartComidasComponent,
    ChartIngresosComponent,
    ChartPedidosComponent,
    ChartPedidosClienteComponent,
    ChartClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4000'],
        disallowedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
