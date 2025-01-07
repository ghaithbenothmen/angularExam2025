import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  apiUrlEquipe: string="http://localhost:3000/matchs";
  constructor(private http:HttpClient) {}

 
  addMatch(match:Match): Observable<Match>{
    return this.http.post<Match>(this.apiUrlEquipe, match);
  }

  getMatchs(): Observable<Match[]>{
    return this.http.get<Match[]>(this.apiUrlEquipe); 
  }
  
  getMatchById(id:string): Observable<Match>{
    return this.http.get<Match>(`${this.apiUrlEquipe}/${id}`); 
  }

  updateScore(id:string, score:any): Observable<Match>{
    return this.http.put<Match>(`${this.apiUrlEquipe}/${id}`, score);
  }

}
