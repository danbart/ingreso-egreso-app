import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( private authService: AuthService ) { }

  canActivate() {

    // const autenticado = false;

    // if (autenticado === false ) {
    //   this.router.navigate(['/login']);
    // }

    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth()
    .pipe(
      // para cancelar la subscripcion
      take(1)
    );
  }
}
