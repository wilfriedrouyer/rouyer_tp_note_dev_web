import {Component, Input, OnInit} from '@angular/core';
import {DrawerComponent} from "../drawer/drawer.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // @ViewChild('chartContainer', { read: MatDrawer }) drawer!:MatDrawer;
  @Input() drawer!: DrawerComponent;


}
