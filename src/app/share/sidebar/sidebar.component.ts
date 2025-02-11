import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;

  subscription: Subscription = new Subscription();

  constructor( private authSErvice: AuthService, private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').pipe(
      filter( auth => auth.user != null)
    ).subscribe( auth => this.nombre = auth.user.nombre );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.ingresoEgresoService.cancelarSubscriptions();
    this.authSErvice.loguot();
  }

}
