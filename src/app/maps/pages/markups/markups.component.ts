import { AfterViewInit, Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


// interface que me ayudará a guardar el color del marcador ya que no hay un metodo en mapbox que me devuelvo el color que le asigné a mi marcador
interface MyMarker {
  marker: mapboxgl.Marker;
  color: string;
};


interface MarkerStorage {
  coordinates: mapboxgl.LngLat;
  color: string;
};


@Component({
  selector: 'app-markups',
  templateUrl: './markups.component.html',
  styles: [
    `
      .map-container {
        height: 100%;
        width: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99; /** este z-index puede ser cualquier numero positivo creo */
      }

      li {
        cursor: pointer;
      }
    `
  ]
})
export class MarkupsComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef<HTMLDivElement>;
  map!: mapboxgl.Map;
  center: [number, number] = [-78.46486761735041, -7.1638907249615755];
  zoomLevel: number = 16;
  arrayMarkers: MyMarker[] = [];


  constructor() { }


  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // Leemos del localstorage los marcadores
    this.readLocalStorage();

    // elemento que se usara como marcador personalizado
    // const markerHTML: HTMLElement = document.createElement('div');
    // markerHTML.textContent = 'Hello World';

    // con esto establecemos el marcador que se mostrara al cargar la pagina, con las coordenadas definidas arriba
    // const marker = new mapboxgl.Marker({
    //   // element: markerHTML,
    //   draggable: true
    // }).setLngLat(this.center)
    //   .addTo(this.map)

    // este eventListern es por si queremos agregar marcadores al hacer click
    // this.map.on('click', (evento) => {
    //   // console.log(evento.lngLat);
    //   const { lng, lat } = evento.lngLat;
    //   const marker = new mapboxgl.Marker({
    //     draggable: true
    //   }).setLngLat([lng, lat])
    //     .addTo(this.map);
    // })

  };


  // Methods
  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)); // genera un color aleatorio en hexadecimal

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat(this.center)
      .addTo(this.map);

    // agrego el marcador nuevo a mi arreglo con su respectivo color para luego usarlo en el HTML
    this.arrayMarkers.push({
      marker: newMarker,
      color
    });

    this.saveInLocalStorage();

    // eventListener para actualizar el localstorage cada vez que se deja de arrastrar un marcador nuevito
    newMarker.on('dragend', () => {
      this.saveInLocalStorage();
    });

  };


  goToMarker( coordinates: mapboxgl.LngLat ) {
    this.map.flyTo({
      center: coordinates,
      zoom: 17
    });
  };

  deleteMarker( i: number ) {
    this.arrayMarkers[i].marker.remove(); // lo remueve del mapa
    this.arrayMarkers.splice(i, 1); // lo remueve del array
    this.saveInLocalStorage(); // actualizamos el localStorage
  };


  // Para manejar en el local storage nuestros marcadores creados
  saveInLocalStorage() {
    // servira para guardar un array de objetos de tipo MarkerStorage(interfaz creada), ya que en el local storage no se puede
    // guardar directamente un marcador de tipo mapboxgl.Map
    const arrayMarkersStorage: MarkerStorage[] = [];

    this.arrayMarkers.forEach( marker => {
      // agregamos las coordenadas y el color de cada marcador creado, en el localstorage
      arrayMarkersStorage.push({
        coordinates: marker.marker.getLngLat(),
        color: marker.color
      })
    });

    localStorage.setItem( 'markers', JSON.stringify(arrayMarkersStorage) );
  };

  readLocalStorage() {
    if ( !JSON.parse( localStorage.getItem('markers')! ) ) { return };

    const arrayStorage: MarkerStorage[] = JSON.parse( localStorage.getItem('markers')! );
    // console.log(arrayStorage);
    arrayStorage.forEach( elemento => {
      const markerNew = new mapboxgl.Marker({
        draggable: true,
        color: elemento.color
      }).setLngLat(elemento.coordinates)
        .addTo(this.map)

      // tambien llenamos nuestro arrayMarkers con el markerNew creado arribita, ya que sino al recargar
      // la pagina se pierden los que teniamos creados
      this.arrayMarkers.push({
        marker: markerNew,
        color: elemento.color
      });


      // eventListener para actualizar el localstorage cada vez que se deja de arrastrar un marcador leido del localstorage
      markerNew.on('dragend', () => {
        this.saveInLocalStorage();
      });

    });
  };

}
