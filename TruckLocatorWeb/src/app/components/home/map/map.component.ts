import { Component, OnInit, Input, OnChanges } from '@angular/core';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-control-geocoder';
import { FirebaseService } from '../../../services/firebase.service';
import { ITrack } from 'src/models/track';
declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  //geoTestData: IGeolocation[] = [];
  map = null;
  dataInitialized = false;
  @Input() shownTrack: ITrack;
  routingControl = null;
  
  constructor(private dbService: FirebaseService) { }

  ngOnInit() {
    this.map = L.map('mapid').setView([48.151965, 17.117568], 13);
    // tslint:disable-next-line:max-line-length
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmxhaG9zIiwiYSI6ImNqbjV5YXFsNTBtZHczcW52bXJtb2ExcjYifQ.e6dG2xewda_2BovfbF7uyQ', {
      // tslint:disable-next-line:max-line-length
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
    }).addTo(this.map);

    // this.map.on('click', (e) => {
    // });
    this.dataInitialized = true;

    // this.dbService.getGeolocations().subscribe(data => {
    //   this.geoTestData = data;
    //   this.dataInitialized = true;
    // });
  }

  ngOnChanges() {
    if (this.dataInitialized) {
      this.showTrackerRoute(this.shownTrack);
    }
  }

  showTrackerRoute(track: ITrack) {
    if (this.routingControl != null) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }

    const coordinationsObject = track.coordinations;
    
    var coordinations = Object.keys(coordinationsObject).map(function(e){
      Object.keys(coordinationsObject[e]).forEach(function(k){
         if(typeof coordinationsObject[e][k] == "object") {
          coordinationsObject[e][k] = Object.keys(coordinationsObject[e][k]).map(function(l){
             return coordinationsObject[e][k][l];
           });
         }
      });
      return coordinationsObject[e];
    });
    
    
    //const geolocations = this.geoTestData.filter(data => data.id === id)[0];
    var markers = [];
    coordinations.forEach(geolocation => {
      var marker = L.marker([geolocation.latitude, geolocation.longitude]);
      markers.push(marker.getLatLng());
    });

    this.routingControl = L.Routing.control({
      waypoints: markers,
      lineOptions: {
        styles: [
          {color: 'black', opacity: 0.15, weight: 7},
          {color: 'white', opacity: 0.7, weight: 4},
          {color: 'red', opacity: 1, weight: 1}
        ],
        missingRouteStyles: [
          {color: 'black', opacity: 0.15, weight: 7},
          {color: 'white', opacity: 0.6, weight: 4},
          {color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12'}
        ]
     },
      createMarker: function(i, wp, n) {
        if (i == 0) {
          L.circleMarker(wp.latLng, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 5
          })
        } else if (i == n -1) {
          return L.marker(wp.latLng, {
            icon: L.icon({
              iconUrl: './assets/marker-icon2.png',
              iconSize: [24, 24],
              shadowUrl: './assets/marker-shadow.png',
              shadowSize: [50, 35],
              shadowAnchor: [20, 25]
            })
          })
        }
        return L.circleMarker(wp.latLng, {
            color: '#FF280F',
            fillColor: '#FF280F',
            fillOpacity: 0.5,
            radius: 3
          })
      },
      show: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      //geocoder: L.Control.Geocoder.nominatim()
    }).addTo(this.map);
    var bounds = new L.latLngBounds(markers);

    this.map.fitBounds(bounds);
  }
}
