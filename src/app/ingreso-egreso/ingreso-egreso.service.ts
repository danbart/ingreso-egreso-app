import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemSubscription: Subscription = new Subscription();


  constructor( private afDB: AngularFirestore, private authService: AuthService,
               private store: Store<AppState> ) { }

  initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('auth')
    .pipe(
      // Filter hace una condición que no deja pasar hasta que no se cumpla
      filter( auth => auth.user != null )
    )
    .subscribe( auth => {
      this.ingresoEgresoItems(auth.user.uid);
    });

  }

  private ingresoEgresoItems( uid: string ) {
    this.ingresoEgresoItemSubscription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( docData => {
        return docData.map( doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
    )
    .subscribe( (coleccion: any ) => {
      this.store.dispatch( new SetItemsAction(coleccion));
    });
  }

  cancelarSubscriptions() {
    this.ingresoEgresoItemSubscription.unsubscribe();
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {

    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
    .collection('items').add({ ... ingresoEgreso });
  }

  borrarIngresoEgreso( item: IngresoEgreso) {

    const user = this.authService.getUsuario();

    this.afDB.doc(`${user.uid }/ingresos-egresos/items/${item.uid}`).delete()
        .then(() => {
          Swal.fire('Eliminado', item.descripcion, 'success');
        });

  }


}
