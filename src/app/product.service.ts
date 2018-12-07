import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private ngFireDataBase: AngularFireDatabase) {}

  create(product) {
    this.ngFireDataBase.list('/products').push(product);
  }
}
