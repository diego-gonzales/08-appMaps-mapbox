import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullscreenMapComponent } from './pages/fullscreen-map/fullscreen-map.component';
import { MarkupsComponent } from './pages/markups/markups.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fullscreen',
        component: FullscreenMapComponent
      },
      {
        path: 'markups',
        component: MarkupsComponent
      },
      {
        path: 'zoom-range',
        component: ZoomRangeComponent
      },
      {
        path: 'properties',
        component: PropertiesComponent
      },
      {
        path: '**',
        redirectTo: 'fullscreen'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MapsRoutingModule { }
