import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from 'kypo2-auth';

@Injectable()
export class HighlightService {

  private highlightedPlayerSubject = new BehaviorSubject<User>(undefined);
  highlightedPlayer$ = this.highlightedPlayerSubject.asObservable();

  highlight(player: User) {
    if (this.isAlreadyHighlighted(player)) {
      this.highlightedPlayerSubject.next(null);
    } else {
      this.highlightedPlayerSubject.next(player);
    }
  }

  clear() {
    this.highlightedPlayerSubject.next(null);
  }

  private isAlreadyHighlighted(player: User): boolean {
    return player.equals(this.highlightedPlayerSubject.getValue());
  }
}
