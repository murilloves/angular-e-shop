import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private ngFireDatabase: AngularFireDatabase) { }

  getAll() {
    return this.ngFireDatabase.list('/categories')
      .snapshotChanges()
      .pipe(
        map(items$ => {
          return items$.map(item => {
            const key$ = item.payload.key;
            const data = item.payload.val();
            return { key$, ...data };
          });
        })
      );
  }
}
