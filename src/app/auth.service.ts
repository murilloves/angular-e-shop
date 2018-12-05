import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppUser } from './models/app-user';
import { UserService } from './user.service';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.user$ = ngFireAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.ngFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.ngFireAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        }

        return of(null);
      })
    );
  }
}
