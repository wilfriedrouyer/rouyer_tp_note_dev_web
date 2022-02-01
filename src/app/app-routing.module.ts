import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {ListMusicsComponent} from "./list-music/list-music.component";
import {EditionComponent} from "./list-music/edition/edition.component";
import {MusicDetailResolverResolver} from "./partage/music-detail-resolver/music-detail-resolver.resolver";

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {path:'accueil', component: AccueilComponent},
  {path:'listMusics', component: ListMusicsComponent},
  { path: 'edit/:id', component: EditionComponent, resolve: { music: MusicDetailResolverResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
