import { Component } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  getIconSource(icon: string): string {
    const iconPrefix = isAndroid ? 'res://' : 'res://tabIcons/';

    return iconPrefix + icon;
}
}
