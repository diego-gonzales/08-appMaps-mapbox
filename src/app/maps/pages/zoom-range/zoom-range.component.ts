import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        height: 100%;
        width: 100%;
      }

      .clasecita-row {
        position: fixed;
        z-index: 999;
        bottom: 50px;
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        /* left: 50px; // mejor usé el mx-5 de bootstrap */
        /* right: 50px; */
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('myMap') divMap!: ElementRef<HTMLDivElement>;
  map!: mapboxgl.Map;
  center: [number, number] = [-78.46486761735041, -7.1638907249615755]; // el centro debe ser de este tipo [num, num]
  zoomLevel: number = 16;



  constructor() { }

  // ver video 312 para esta parte
  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  };

  // uso afterviewinit ya que hasta el onInit aun se encuentra como undefined la referencia del elemento html 'div'
  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // tener en cuenta que en mapbox primero es la 'long' y luego la 'lat'
      zoom: this.zoomLevel
    });

    // este es un eventListener que escuchará cada vez que se haga un zoom en el mapa (ver video 310 para mejor comprension)
    this.map.on('zoom', (evento) => {
      // console.log(evento);
      this.zoomLevel = this.map.getZoom();
    });

    // este eventListener ayudara a que el zoom no pase de 18
    this.map.on('zoomend', () => {
      if( this.map.getZoom() > 18 ) {
        this.map.zoomTo(18);
      }
    });


    this.map.on('move', (evento) => {
      // console.log(this.map.getCenter());// lo puedo manejar con el metodo de frente del mapa
      // console.log(evento.target.getCenter()); // o con el evento
      const { lng, lat } = evento.target.getCenter();
      this.center = [ lng, lat ];
    })
  };

  // aumenta el zoom un nivel
  zoomOut() {
    this.map.zoomOut();
  };
  
  // disminuye el zoom un nivel
  zoomIn() {
    this.map.zoomIn();
  };

  // metodo que ayuda a establecer el nivel de zoom cada vez que cambia el valor del input range
  changeValueInputRange( valueRangeInput: string) {
    this.map.zoomTo( Number(valueRangeInput) );
  };
}
