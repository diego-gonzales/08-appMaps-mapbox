import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';

import { MinimapComponent } from './components/minimap/minimap.component';
import { FullscreenMapComponent } from './pages/fullscreen-map/fullscreen-map.component';
import { MarkupsComponent } from './pages/markups/markups.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';


@NgModule({
  declarations: [
    MinimapComponent,
    FullscreenMapComponent,
    MarkupsComponent,
    ZoomRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
