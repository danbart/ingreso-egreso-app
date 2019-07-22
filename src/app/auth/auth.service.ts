import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import Swal from 'sweetalert2';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private roueter: Router, private afDB: AngularFirestore ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(resp => {

      const user: User = {
        uid: resp.user.uid,
        nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`)
      .set(user)
      .then( () => {
        this.roueter.navigate(['/']);
      } );
    })
    .catch( err => {
      Swal.fire('Error en el login', err.message, 'error');
    });

  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      this.roueter.navigate(['/']);
    })
    .catch( err => {
      Swal.fire('Error en el login', err.message, 'error');
    });
  }

  loguot() {
    this.roueter.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map( fbUser => {

        if ( fbUser == null ) {
          this.roueter.navigate(['/login']);
        }

        return fbUser != null;
      })
    );
  }
}
