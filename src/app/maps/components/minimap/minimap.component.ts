import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 150px;
        margin: 0px;
      }
    `
  ]
})
export class MinimapComponent implements AfterViewInit {

  @Input('lnglatMinimap') lnglat!: [number, number];
  @ViewChild('minimap') divMinimap!: ElementRef<HTMLDivElement>;

  constructor() { }

  // Aclaracion: se usa el AfterViewInit en vez del OnInit ya que usamos una referencia local al divMinimap y solo estara
  // disponible despues que se construye todo el HTML, por eso el AfterViewInit
  ngAfterViewInit(): void {
    const minimap = new mapboxgl.Map({
      container: this.divMinimap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lnglat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
                .setLngLat(this.lnglat)
                .addTo(minimap);
  };

}
