import { Component } from '@angular/core';


interface MenuItem {
  path: string;
  name: string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {
      path: '/maps/fullscreen',
      name: 'Fullscreen'
    },
    {
      path: '/maps/zoom-range',
      name: 'Zoom Range'
    },
    {
      path: '/maps/markups',
      name: 'Markups'
    },
    {
      path: '/maps/properties',
      name: 'Properties'
    }
  ]

  constructor() { }

}
