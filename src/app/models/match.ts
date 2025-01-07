import { Equipe } from "./equipe";
import { Score } from "./score";

export class Match {
    id!:string;
    date!:string;
    heure!:string;
    lieu!:string;
    equipeA:Equipe = new Equipe();
    equipeB:Equipe = new Equipe();
    score:Score = new Score();
}