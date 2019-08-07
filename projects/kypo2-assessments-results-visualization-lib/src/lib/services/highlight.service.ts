import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Trainee} from '../model/trainee';

@Injectable()
export class HighlightService {

  private highlightedPlayerSubject = new BehaviorSubject<Trainee>(undefined);
  highlightedPlayer$ = this.highlightedPlayerSubject.asObservable();

  highlight(player: Trainee) {
    if (this.isAlreadyHighlighted(player)) {
      this.highlightedPlayerSubject.next(null);
    } else {
      this.highlightedPlayerSubject.next(player);
    }
  }

  clear() {
    this.highlightedPlayerSubject.next(null);
  }

  private isAlreadyHighlighted(player: Trainee): boolean {
    return player.equals(this.highlightedPlayerSubject.getValue());
  }
}
