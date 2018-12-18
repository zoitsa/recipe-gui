import { Component, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';
import { SelectedIndexChangedEventData, TabView, TabViewItem } from 'tns-core-modules/ui/tab-view';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  private _title: string;

  constructor() { }

  ngOnInit() {
  }

//   get title(): string {
//     return this._title;
// }

// set title(value: string) {
//     if (this._title !== value) {
//         this._title = value;
//     }
// }

/* ***********************************************************
* The "getIconSource" function returns the correct tab icon source
* depending on whether the app is ran on Android or iOS.
* You can find all resources in /App_Resources/os
*************************************************************/
getIconSource(icon: string): string {
    return isAndroid ? '' : 'res://tabIcons/' + icon;
}

/* ***********************************************************
* Get the current tab view title and set it as an ActionBar title.
* Learn more about the onSelectedIndexChanged event here:
* https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
*************************************************************/
onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    const tabView = <TabView>args.object;
    const selectedTabViewItem = tabView.items[args.newIndex];

    // this.title = selectedTabViewItem.title;
}

}
