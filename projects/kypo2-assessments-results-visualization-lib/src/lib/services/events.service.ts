import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Trainee} from '../model/trainee';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private playerClicked  = new Subject<any>();
  private containerClicked = new Subject<any>();
  private highlightedPlayer: Trainee;

  playerClicked$ = this.playerClicked.asObservable();
  containerClicked$ = this.containerClicked.asObservable();

  constructor() { }

  clickOnPlayer(player: Trainee) {
    const isPlayerAlreadyHighlighted = player.equals(this.highlightedPlayer);
    if (isPlayerAlreadyHighlighted) {
      this.clickOnContainer();
    } else {
      this.playerClicked.next(player);
      this.highlightedPlayer = player;
    }
  }

  clickOnContainer() {
    this.containerClicked.next();
    this.highlightedPlayer = null;
  }

}
