import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipe } from '../models/equipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  apiUrlEquipe: string="http://localhost:3000/equipes";
  constructor(private http:HttpClient) {}

  
  getEquipes(): Observable<Equipe[]>{
    return this.http.get<Equipe[]>(this.apiUrlEquipe); 
  }

  getEquipeById(id:string): Observable<Equipe>{
    return this.http.get<Equipe>(`${this.apiUrlEquipe}/${id}`); 
  }
  


  
}
