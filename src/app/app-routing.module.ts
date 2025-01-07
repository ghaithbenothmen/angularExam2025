import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListeMatchsComponent } from './liste-matchs/liste-matchs.component';
import { ListeEquipesComponent } from './liste-equipes/liste-equipes.component';
import { MatchComponent } from './match/match.component';
import { ModifierScoreComponent } from './modifier-score/modifier-score.component';

const routes: Routes = [

  {path:'', component: HomeComponent},
  {path:'liste-matchs',component: ListeMatchsComponent},
  {path:'liste-equipes',component: ListeEquipesComponent},
  {path:'add-match',component:MatchComponent},
  {path:'modifier-score/:id',component:ModifierScoreComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

