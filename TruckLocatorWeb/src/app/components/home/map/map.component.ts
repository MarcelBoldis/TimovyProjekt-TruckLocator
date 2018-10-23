import { Component, OnInit } from '@angular/core';
import '../../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const mymap = L.map('mapid').setView([48.151965, 17.117568], 13);


    // tslint:disable-next-line:max-line-length
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmxhaG9zIiwiYSI6ImNqbjV5YXFsNTBtZHczcW52bXJtb2ExcjYifQ.e6dG2xewda_2BovfbF7uyQ', {
      // tslint:disable-next-line:max-line-length
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
    }).addTo(mymap);

    const marker1 = L.marker([48.151965, 17.117568]).addTo(mymap);
    const marker2 = L.marker([48.151965, 17.072995]).addTo(mymap);

    L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(mymap);
    console.log(L);

  }

}
