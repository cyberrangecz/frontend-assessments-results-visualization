import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { FFQ } from '../../model/question/ffq/ffq';
import { FFQAnswer } from '../../model/question/ffq/ffq-answer';
import { EventsService } from '../../services/events.service';
import { Subscription } from 'rxjs';
import { D3, D3Service } from 'd3-ng2-service';
import {Trainee} from '../../model/trainee';

@Component({
  selector: 'kypo2-viz-assessments-results-ffq',
  templateUrl: './ffq-results.component.html',
  styleUrls: ['./ffq-results.component.css']
})
export class FFQResultsComponent implements OnInit, OnDestroy {

  @Input() question: FFQ;

  highlightedPlayer: Trainee;

  private playerClicked: Subscription;
  private containerClicked: Subscription;

  constructor(private eventsService: EventsService) {
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.playerClicked = this.eventsService.playerClicked$.subscribe((player: Trainee) => {
      this.highlightPlayer(player);
    });

    this.containerClicked = this.eventsService.containerClicked$.subscribe(
      () => {
        this.unhighlightPlayer();
      }
    );
  }

  ngOnDestroy() {
    this.playerClicked.unsubscribe();
    this.containerClicked.unsubscribe();
  }

  ngOnInit() {
  }

  highlightPlayer(player: Trainee) {
    this.highlightedPlayer = player;
  }

  unhighlightPlayer() {
    this.highlightedPlayer = null;
  }

  onRowClicked(answer: FFQAnswer, event: MouseEvent) {
    event.stopPropagation();
    this.eventsService.clickOnPlayer(answer.trainee);
  }

  onContainerClicked() {
    this.eventsService.clickOnContainer();
  }

}
