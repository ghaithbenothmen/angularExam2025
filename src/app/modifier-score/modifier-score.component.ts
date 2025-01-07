import { Component } from '@angular/core';
import { EquipeService } from '../services/equipe.service';
import { Equipe } from '../models/equipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Score } from '../models/score';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../services/match.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-modifier-score',
  templateUrl: './modifier-score.component.html',
  styleUrls: ['./modifier-score.component.css']
})
export class ModifierScoreComponent {
  matchId!: string;
updateScore() {
  const score:Score={
    equipeA:this.scoreForm.value.scoreA,
    equipeB:this.scoreForm.value.scoreB
  }
  this.matchService.updateScore(this.matchId,score).subscribe(data=>{
    console.log(data);
  })
}

  constructor(private route:ActivatedRoute, private fb: FormBuilder,private matchService:MatchService) {
    this.scoreForm=this.fb.group({
      scoreA:[''],
      scoreB:['']
    })
   }

  scores!:Score[];
match!:Match;
  scoreForm !:FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.matchId = params['id'];
      this.matchService.getMatchById(this.matchId).subscribe(data=>{
      console.log(data);
      this.scoreForm.patchValue
      ({
        scoreA:data.score.equipeA,
        scoreB:data.score.equipeB
      })

}
    )
 

  })


}
}
