import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mergeMap} from "rxjs";
import {AjoutPopupComponent} from "./ajout-popup/ajout-popup.component";
import {ListMusicService, Music} from "../partage/service/list-music.service";


@Component({
  selector: 'app-service',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss']
})
export class ListMusicsComponent implements OnInit {

  private addDialog: MatDialogRef<AjoutPopupComponent> | any;
  musics : Music[] = [];
  dialogStatus = 'inactive';
  view = 'card';

  constructor(
    private readonly listMusicService: ListMusicService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef) {

  }

  personnelFiltered(musics: any[]) {
    this.musics = musics;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.listMusicService.fetch().subscribe(musics => {
      this.musics = musics || [];
      this.musics.forEach(music => {
        const date = music.date;
        music.date = date?.substring(0, 4);
      });
    });
  }

  delete(person: Music) {
    this.listMusicService.delete(person.id!).subscribe(musics => {
      this.musics = musics;
      this.listMusicService.updatedEmployeeList(person.id!);
      this.cdr.markForCheck();
    });
  }

  add(person: Music) {
    this.listMusicService
      .create(person)
      .pipe(mergeMap(() => this.listMusicService.fetch()))
      .subscribe(musics => {
        this.musics = musics;
        this.hideDialog();
      });
  }

  update(person: Music) {
    this.listMusicService
      .update(person)
      .pipe(mergeMap(() => this.listMusicService.fetch()))
      .subscribe(musics => {
        this.musics = musics;
        this.hideDialog();
      });
  }

  showDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutPopupComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((person:any)=> {
      this.dialogStatus = 'inactive';
      if (person) {
        this.add(person);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if(this.addDialog != undefined){
      this.addDialog.close();
    }
  }

  switchView() {
    this.view = this.view === 'card' ? 'list' : 'card';
  }

}
