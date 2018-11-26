import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  user$: Observable<firebase.User>;

  constructor(private ngFireAuth: AngularFireAuth) {
    this.user$ = ngFireAuth.authState;
  }

  logout() {
    this.ngFireAuth.auth.signOut();
  }
}
