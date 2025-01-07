import { Component } from '@angular/core';
import { MatchService } from '../services/match.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-liste-matchs',
  templateUrl: './liste-matchs.component.html',
  styleUrls: ['./liste-matchs.component.css']
})
export class ListeMatchsComponent {

  constructor(private matchSer:MatchService) { }

  matchs!:Match[];
  
  ngOnInit(): void {
    this.matchSer.getMatchs().subscribe(data=>{
      console.log(data);
      this.matchs=data;
    })
  }

}
