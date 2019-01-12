import { Component, OnInit } from '@angular/core';
import { ITrack } from 'src/models/track';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  track: ITrack;

  constructor() { }

  ngOnInit() {
  }

  showTrack(track) {
    this.track = track;
  }

}
