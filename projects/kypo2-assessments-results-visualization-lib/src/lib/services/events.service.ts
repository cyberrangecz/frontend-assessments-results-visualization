import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private playerClicked  = new Subject<any>();
  private containerClicked = new Subject<any>();
  private isPlayerHighlighted: boolean = false;

  playerClicked$ = this.playerClicked.asObservable();
  containerClicked$ = this.containerClicked.asObservable();

  constructor() { }

  clickOnPlayer(userName: string) {
    if (this.isPlayerHighlighted) {
      this.containerClicked.next();
    } else {
      this.playerClicked.next(userName);
    }
    this.isPlayerHighlighted = !this.isPlayerHighlighted;
  }

  clickOnContainer() {
    this.containerClicked.next();
  }

}
