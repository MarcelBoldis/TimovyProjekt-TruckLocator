import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mapRouteId: number = 0;

  constructor() { }

  ngOnInit() {
  }

  showRoute(id) {
    this.mapRouteId = id;
  }

}
