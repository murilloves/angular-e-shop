import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private ngFireDatabase: AngularFireDatabase) { }

  getCategories() {
    return this.ngFireDatabase.list('/categories').valueChanges();
  }
}
