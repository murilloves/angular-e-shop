import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private ngFireAuth: AngularFireAuth) {
    this.user$ = ngFireAuth.authState;

    // ngFireAuth.authState.subscribe(loginInfo => {
    //   this.user$ = loginInfo;
    // });
  }

  login() {
    this.ngFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.ngFireAuth.auth.signOut();
  }
}
