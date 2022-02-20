import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (next.routeConfig?.path == 'Login' || next.routeConfig?.path == 'Registro') {
      if (localStorage.getItem('access_token')) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    if (localStorage.getItem('access_token')) {
      var token = localStorage.getItem('access_token')!;
      var decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken.tipo == "Personal" && (next.routeConfig?.path == 'Reportes' || next.routeConfig?.path == 'Facturas' || next.routeConfig?.path == 'Cocina' || next.routeConfig?.path == 'Manufacturados' || next.routeConfig?.path == 'Personal' || next.routeConfig?.path == 'Articulos')) {
        return true;
      }
      if (decodedToken.tipo == "Cliente" && (next.routeConfig?.path == 'Pedidos' || next.routeConfig?.path == 'Carta' || next.routeConfig?.path == 'Carrito')) {
        return true;
      }

      return false;
    }

    this.router.navigate(['Login']);
    return false;
  }

}
