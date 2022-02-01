import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Music} from "../service/list-music.service";

@Component({
  selector: 'carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {

  @Input() music: Music;

  @Output('personDelete') delete$: EventEmitter<any> = new EventEmitter();

  @Output('personUpdate') update$: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.music = {};
  }

  delete() {
    this.delete$.emit(this.music);
  }

  update() {
    this.update$.emit(this.music);
  }

}
