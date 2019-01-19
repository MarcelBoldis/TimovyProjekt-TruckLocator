import { Component, OnInit } from '@angular/core';
import { ITrack } from 'src/models/track';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavServiceService } from 'src/app/services/nav-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  track: ITrack;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              public navService: NavServiceService) {
              }

  ngOnInit() {
    this.navService.show();
  }

  showTrack(track) {
    this.track = track;
  }

}
