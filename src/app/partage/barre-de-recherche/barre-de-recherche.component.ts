import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ListMusicService} from "../service/list-music.service";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, Subscription, switchMap, take} from "rxjs";

@Component({
  selector: 'barre-de-recherche',
  templateUrl: './barre-de-recherche.component.html',
  styleUrls: ['./barre-de-recherche.component.scss']
})
export class BarreDeRechercheComponent implements OnInit, OnDestroy {

  barreDeRecherche = new FormControl();
  filteredPersonnel!: Observable<any[]>;

  filteredPersonnelSubscription: Subscription | null = null;
  listPersonneServiceSubscription: Subscription | null = null;

  @Input() personnel: any[] = [];

  @Output() readonly typing = new EventEmitter<any[]>();

  constructor(
    private readonly listMusicService: ListMusicService) {
  }

  ngOnInit(): void {
    this.filteredPersonnel = this.barreDeRecherche.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        if (value) {
          return this.listMusicService.search(value).pipe(
            catchError(() => of([]))
          );
        } else {
          return this.listMusicService.fetch();
        }
      })
    );

    this.filteredPersonnelSubscription = this.filteredPersonnel.subscribe({
      next: personnel => this.typing.emit(personnel)
    });

    this.listPersonneServiceSubscription = this.listMusicService.employees$.subscribe({
      next: () => {
        this.listMusicService.fetch().pipe(take(1)).subscribe(personnel => this.personnel = personnel);
        this.barreDeRecherche.setValue('');
      }
    });
  }

  ngOnDestroy() {
    this.filteredPersonnelSubscription?.unsubscribe();
    this.listPersonneServiceSubscription?.unsubscribe();
  }

}
