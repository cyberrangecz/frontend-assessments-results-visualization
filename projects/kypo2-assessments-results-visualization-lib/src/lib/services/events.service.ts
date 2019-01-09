import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private playerClicked  = new Subject<any>();
  private containerClicked = new Subject<any>();
  private highlightedPlayer: string;

  playerClicked$ = this.playerClicked.asObservable();
  containerClicked$ = this.containerClicked.asObservable();

  constructor() { }

  clickOnPlayer(userName: string) {
    const isPlayerAlreadyHighlighted = userName === this.highlightedPlayer;
    if (isPlayerAlreadyHighlighted) {
      this.clickOnContainer();
    } else {
      this.playerClicked.next(userName);
      this.highlightedPlayer = userName;
    }
  }

  clickOnContainer() {
    this.containerClicked.next();
    this.highlightedPlayer = null;
  }

}
