import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

export interface Music {
  id?: string;
  title?: string;
  description?: string;
  album?: string;
  artist?: string;
  duration?: string;
  date?: string;
  styles?: string[];
  picture?: string | ArrayBuffer | null;
}

@Injectable({
  providedIn: 'root'
})
export class ListMusicService {

  private musics = new BehaviorSubject<string>('');

  private urlServer:any = {};

  constructor(private readonly http: HttpClient) {

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls

    Object.keys(environment.backend.endpoints).forEach(
      // @ts-ignore
      k => (this.urlServer[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
    console.log(this.urlServer);

  }

  get employees$(): Observable<string> {
    return this.musics.asObservable();
  }

  updatedEmployeeList(data: string){
    this.musics.next(data);
  }

  fetch(): Observable<Music[]> {
    return this.http.get<Music[]>(this.urlServer.toutesLesMusiques);
  }

  search(id: string): Observable<Music[]> {
    return this.http.get<Music[]>(this.urlServer.findById.replace(':id', id));
  }

  fetchRandom(): Observable<Music> {
    return this.http.get<Music>(this.urlServer.musiqueAleatoire);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.urlServer.findById.replace(':id', id));
  }

  create(musique: Music): Observable<Music> {
    return this.http.post<Music>(this.urlServer.toutesLesMusiques, musique);
  }

  fetchOne(id: string): Observable<Music> {
    return this.http.get<Music>(this.urlServer.uneMusique.replace(':id', id));
  }

  update(musique: Music): Observable<Music> {
    return this.http.put<Music>(this.urlServer.uneMusique.replace(':id', musique.id), musique);
  }
}
