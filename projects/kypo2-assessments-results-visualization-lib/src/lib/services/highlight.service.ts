import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from 'kypo2-auth';

/**
 * Service holding state of highlighted players
 */
@Injectable()
export class HighlightService {

  private highlightedPlayerSubject = new BehaviorSubject<User>(undefined);
  /**
   * Selected player whose answers should be highlighted
   */
  highlightedPlayer$ = this.highlightedPlayerSubject.asObservable();

  /**
   * Selects player to highlight his answers
   * @param player player whose answers should be highlighted
   */
  highlight(player: User) {
    if (this.isAlreadyHighlighted(player)) {
      this.highlightedPlayerSubject.next(null);
    } else {
      this.highlightedPlayerSubject.next(player);
    }
  }

  /**
   * Clears highlighted player
   */
  clear() {
    this.highlightedPlayerSubject.next(null);
  }

  private isAlreadyHighlighted(player: User): boolean {
    return player.equals(this.highlightedPlayerSubject.getValue());
  }
}
