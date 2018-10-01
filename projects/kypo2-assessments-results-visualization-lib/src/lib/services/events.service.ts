import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private playerClicked  = new Subject<any>();
  private containerClicked = new Subject<any>();

  playerClicked$ = this.playerClicked.asObservable();
  containerClicked$ = this.containerClicked.asObservable();

  constructor() { }

  clickOnPlayer(userName: string) {
    this.playerClicked.next(userName);
  }

  clickOnContainer() {
    this.containerClicked.next();
  }

}
