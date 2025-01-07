import { Component, OnInit } from '@angular/core';
import { Equipe } from '../models/equipe';
import { EquipeService } from '../services/equipe.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../services/match.service';
import { Match } from '../models/match';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matchForm!: FormGroup;
  equipes!: Equipe[];

  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private matchService: MatchService,
    private router: Router
  ) {
    this.matchForm = this.fb.group({
      date: ['', [Validators.required, this.dateValidator]],
      heure: ['', Validators.required],
      lieu: ['', Validators.required],
      equipeA: ['', Validators.required],
      equipeB: ['', Validators.required],
    }, { validators: this.equipesDifferentesValidator });
  }

  ngOnInit(): void {
    this.equipeService.getEquipes().subscribe(data => {
      this.equipes = data;
    });
  }

  addMatch(): void {
    if (this.matchForm.invalid) return;

    const match: Match = {
      ...this.matchForm.value,
      score: { equipeA: 0, equipeB: 0 },
    };

    this.equipeService.getEquipeById(this.matchForm.value.equipeA).subscribe(equipeA => {
      match.equipeA = equipeA;
      this.equipeService.getEquipeById(this.matchForm.value.equipeB).subscribe(equipeB => {
        match.equipeB = equipeB;
        this.matchService.addMatch(match).subscribe(data => {
          console.log('Match added:', data);
          this.router.navigate(['/liste-matchs']);
        });
      });
    });
  }


  dateValidator(control: FormControl): { [key: string]: any } | null {
    const dateValue = new Date(control.value);
    if (dateValue < new Date()) {
      return { dateValidator: 'La date doit être supérieure à la date actuelle' };
    }
    return null;
  }

  equipesDifferentesValidator(group: FormGroup): { [key: string]: any } | null {
    const equipeA = group.get('equipeA')?.value;
    const equipeB = group.get('equipeB')?.value;

    if (equipeA && equipeB && equipeA === equipeB) {
      return { equipesDifferentesValidator: 'Les équipes doivent être différentes' };
    }
    
    return null;
  }
}
