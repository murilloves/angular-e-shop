import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AppUser } from './models/app-user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private ngFireDataBase: AngularFireDatabase) { }

  save (user: firebase.User) {
    this.ngFireDataBase.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.ngFireDataBase.object('/users/' + uid);
  }
}
