import { Component } from '@angular/core';
import { EquipeService } from '../services/equipe.service';
import { Equipe } from '../models/equipe';

@Component({
  selector: 'app-liste-equipes',
  templateUrl: './liste-equipes.component.html',
  styleUrls: ['./liste-equipes.component.css']
})
export class ListeEquipesComponent {

  constructor(private equipeService:EquipeService) { }
  
equipes!:Equipe[];

  ngOnInit(): void {
    this.equipeService.getEquipes().subscribe(data=>{
      console.log(data);
      this.equipes=data;
    })
  }
}
