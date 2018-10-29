import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // FIREBASE
  data = [];
  constructor(db: AngularFireDatabase) {
    db.list('companies').valueChanges().subscribe(items => {
      this.data = items;
    });
  }
}
