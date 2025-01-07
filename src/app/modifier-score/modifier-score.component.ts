import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-modifier-score',
  templateUrl: './modifier-score.component.html',
  styleUrls: ['./modifier-score.component.css']
})
export class ModifierScoreComponent implements OnInit {
  matchId!: string;
  match!: Match;
  scoreForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private matchService: MatchService,
    private router: Router
  ) {
    this.scoreForm = this.fb.group({
      scoreA: ['', Validators.required],
      scoreB: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.matchId = params['id'];

      this.matchService.getMatchById(this.matchId).subscribe(data => {
        this.match = data;

        this.scoreForm.patchValue({
          scoreA: data.score.equipeA,
          scoreB: data.score.equipeB
        });
      });
    });
  }

  updateMatch(): void {
    if (this.scoreForm.invalid) {
      this.scoreForm.markAllAsTouched();
      return;
    }


    this.match.score.equipeA = this.scoreForm.value.scoreA;
    this.match.score.equipeB = this.scoreForm.value.scoreB;

 
    this.matchService.updateMatch(this.matchId, this.match).subscribe(() => {
      console.log('Match mis à jour avec succès');
      this.router.navigate(['/liste-matchs']);
    });
  }
}
