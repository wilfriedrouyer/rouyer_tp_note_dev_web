import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ListMusicService, Music} from "../service/list-music.service";

@Injectable({
  providedIn: 'root'
})
export class MusicDetailResolverResolver implements Resolve<Music> {

  constructor(private readonly musicService: ListMusicService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Music> {
    const musicId: string | null = route.paramMap.get('id');
    if(musicId != null){
      return this.musicService.fetchOne(musicId);
    }
    else
      return new Observable<Music>();
  }
}
