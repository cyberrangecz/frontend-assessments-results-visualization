import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trainee } from '../model/trainee/trainee';

/**
 * Service holding state of highlighted players
 */
@Injectable()
export class HighlightService {
  private highlightedTraineeSubject$ = new BehaviorSubject<Trainee>(undefined);
  /**
   * Selected player whose answers should be highlighted
   */
  highlightedPlayer$ = this.highlightedTraineeSubject$.asObservable();

  /**
   * Selects player to highlight his answers
   * @param trainee trainee whose answers should be highlighted
   */
  highlight(trainee: Trainee) {
    if (this.isAlreadyHighlighted(trainee)) {
      this.highlightedTraineeSubject$.next(undefined);
    } else {
      this.highlightedTraineeSubject$.next(trainee);
    }
  }

  /**
   * Clears highlighted player
   */
  clear() {
    this.highlightedTraineeSubject$.next(null);
  }

  private isAlreadyHighlighted(trainee: Trainee): boolean {
    const highlighted = this.highlightedTraineeSubject$.getValue();
    return highlighted && trainee.id === highlighted.id;
  }
}
