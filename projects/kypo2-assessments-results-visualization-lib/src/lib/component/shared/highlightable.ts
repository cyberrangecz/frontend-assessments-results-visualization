import {HighlightService} from '../../services/highlight.service';
import {OnDestroy} from '@angular/core';
import {Question} from '../../model/question/question';
import {Answer} from '../../model/question/answer';
import {User} from 'kypo2-auth';

export abstract class Highlightable implements OnDestroy {

  isAlive = true;
  abstract question: Question;

  protected constructor(private highlightService: HighlightService) {
    this.subscribeEvents();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  clear() {
    this.highlightService.clear();
  }

  highlight(answer: Answer, event: MouseEvent) {
    event.stopPropagation();
    this.highlightService.highlight(answer.trainee);
  }

  private subscribeEvents() {
    this.highlightService.highlightedPlayer$
      .subscribe(player => {
        if (player) {
          this.unhighlightPlayer();
          this.highlightPlayer(player);
        } else if (player === null) {
          this.unhighlightPlayer();
        }
      });
  }

  private highlightPlayer(player: User) {
    this.question.answers.forEach(answer => answer.select(player));
  }

  private unhighlightPlayer() {
    this.question.answers.forEach(answer => answer.unselect());
  }
}
