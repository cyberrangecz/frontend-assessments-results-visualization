import { OnDestroy } from '@angular/core';
import { Answer } from '../../model/question/answer';
import { Question } from '../../model/question/question';
import { Trainee } from '../../model/trainee/trainee';
import { HighlightService } from '../../services/highlight.service';

/**
 * Class representing behaviour of highlightable components
 */
export abstract class Highlightable implements OnDestroy {
  isAlive = true;
  abstract question: Question;

  protected constructor(private highlightService: HighlightService) {
    this.subscribeEvents();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  /**
   * Clears highlighting of the component
   */
  clear() {
    this.highlightService.clear();
  }

  /**
   * Highlights selected answer
   * @param answer answer to be selected
   * @param event mouse click event
   */
  highlight(answer: Answer, event: MouseEvent) {
    event.stopPropagation();
    this.highlightService.highlight(answer.trainee);
  }

  private subscribeEvents() {
    this.highlightService.highlightedPlayer$.subscribe((trainee) => {
      if (trainee) {
        this.unhighlightPlayer();
        this.highlightPlayer(trainee);
      } else if (trainee === null) {
        this.unhighlightPlayer();
      }
    });
  }

  private highlightPlayer(trainee: Trainee) {
    this.question.answers.forEach((answer) => answer.tryHighlight(trainee));
  }

  private unhighlightPlayer() {
    this.question.answers.forEach((answer) => answer.clearHighlight());
  }
}
