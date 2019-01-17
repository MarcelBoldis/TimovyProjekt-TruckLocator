import { Component, OnInit } from '@angular/core';
import { ITrack } from 'src/models/track';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  track: ITrack;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) {
                if (!afAuth.auth.currentUser) {
                  router.navigateByUrl('/login');
                }
              }

  ngOnInit() {
  }

  showTrack(track) {
    this.track = track;
  }

}
