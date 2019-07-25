import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
        .subscribe(ingresoEgreso => {
         this.items = ingresoEgreso.items;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ) {

    Swal.fire({
      title: 'Eliminar',
      text: item.descripcion,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this.ingresoEgresoService.borrarIngresoEgreso(item);
      }
    });
  }

}
