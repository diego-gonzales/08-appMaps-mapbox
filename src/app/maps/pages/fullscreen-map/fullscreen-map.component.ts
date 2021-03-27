import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-fullscreen-map',
  templateUrl: './fullscreen-map.component.html',
  styles: [
    `
      #map {
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class FullscreenMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.46486761735041, -7.1638907249615755], // tener en cuenta que en mapbox primero es la 'long' y luego la 'lat'
      zoom: 17
    })
    
  }

}
