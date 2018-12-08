import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private ngFireDataBase: AngularFireDatabase) {}

  create(product) {
    this.ngFireDataBase.list('/products').push(product);
  }

  getAll() {
    return this.ngFireDataBase.list('/products')
      .snapshotChanges()
      .pipe(
        map(items$ => {
          return items$.map(item => {
            const $key = item.payload.key;
            const data = item.payload.val();
            return { $key, ...data };
          })
        })
      )
  }
}
