import { Component } from '@angular/core';
import { Equipe } from '../models/equipe';
import { EquipeService } from '../services/equipe.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../services/match.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {

  matchForm !:FormGroup;

  constructor( private fb: FormBuilder,private equipeService:EquipeService,private matchService:MatchService) { 
    this.matchForm=this.fb.group({
      date:['',Validators.required],
      heure:['',Validators.required],
      lieu:['',Validators.required],
      equipeA:['',Validators.required],
      equipeB:['',Validators.required],
    })
  this.matchForm.get('date')?.setValidators([Validators.required, this.dateValidator]);

  this.matchForm.get('equipeA')?.setValidators([Validators.required, this.equipesDifferentesValidator, this.equipeNatifValidator]);
  this.matchForm.get('equipeB')?.setValidators([Validators.required, this.equipesDifferentesValidator, this.equipeNatifValidator]);
  }


  equipeNatifValidator(control: FormControl): { [key: string]: any } | null {
    const formGroup = control.parent as FormGroup;
    const equipeId = control.value;
    const equipeId2 = formGroup?.get('equipeA')?.value;
    let equipe: Equipe;
    let equipe2: Equipe;
    this.equipeService.getEquipeById(equipeId).subscribe(equipeData => {
      equipe = equipeData;
      this.equipeService.getEquipeById(equipeId2).subscribe(equipeData2 => {
        equipe2 = equipeData2;
        if (equipe.natif !== equipe2.natif) {
          return { equipeNatifValidator: 'Les équipes doivent être de même natif' };
        }
      });
    });
    return null;
  }


  dateValidator(control: FormControl): { [key: string]: any } | null {
    const dateValue = control.value;
    const dateNow = new Date();
    const dateMatch = new Date(dateValue);
    if (dateMatch < dateNow) {
      return { dateValidator: 'La date doit être supérieure à la date actuelle' };
    }

    return null;
  }

  equipesDifferentesValidator(control: FormControl): { [key: string]: any } | null {
    const formGroup = control.parent as FormGroup;
    const equipeA = formGroup?.get('equipeA')?.value;
    const equipeB = control.value;
    if (equipeA === equipeB) {
      return { equipesDifferentesValidator: 'Les équipes doivent être différentes' };
    }
    return null;
  }
    
  equipes!:Equipe[];
  match!:Match;
  equipe!:Equipe;
  equipe2!:Equipe;
    ngOnInit(): void {
      this.equipeService.getEquipes().subscribe(data=>{
        console.log(data);
        this.equipes=data;
      })
    }

    addMatch(): void {
      console.log(this.matchForm.value);
      this.match = this.matchForm.value;
      this.equipeService.getEquipeById(this.matchForm.value.equipeA).subscribe(equipeA => {
        this.match.equipeA = equipeA;
        this.equipeService.getEquipeById(this.matchForm.value.equipeB).subscribe(equipeB => {
          this.match.equipeB = equipeB;
          this.match.score = { equipeA: 0, equipeB: 0 };
  
          this.matchService.addMatch(this.match).subscribe(data => {
            console.log(data);
          });
        });
      });
    }

}
