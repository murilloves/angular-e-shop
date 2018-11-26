import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: firebase.User;

  constructor(private ngFireAuth: AngularFireAuth) {
    ngFireAuth.authState.subscribe(loginInfo => {
      this.user = loginInfo;
    });
  }

  login() {
    this.ngFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
