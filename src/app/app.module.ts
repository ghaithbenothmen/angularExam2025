import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListeEquipesComponent } from './liste-equipes/liste-equipes.component';
import { ListeMatchsComponent } from './liste-matchs/liste-matchs.component';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import { ModifierScoreComponent } from './modifier-score/modifier-score.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ListeEquipesComponent,
    ListeMatchsComponent,
    HomeComponent,
    MatchComponent,
    ModifierScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
