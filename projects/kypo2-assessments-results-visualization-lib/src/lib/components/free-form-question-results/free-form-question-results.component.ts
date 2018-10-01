import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { FFQ } from '../../models/ffq';
import { FFQAnswer } from '../../models/ffqanswer';
import { EventsService } from '../../services/events.service';
import { Subscription } from 'rxjs';
import { D3, D3Service } from 'd3-ng2-service';

@Component({
  selector: 'kypo2-viz-assessments-results-free-form-question-results',
  templateUrl: './free-form-question-results.component.html',
  styleUrls: ['./free-form-question-results.component.css']
})
export class FreeFormQuestionResultsComponent implements OnInit, OnDestroy {

  @Input() FFQData: FFQ;

  questionTitle: string;
  answers: FFQAnswer[];
  order: number;
  highlightedPlayer: string;

  private playerClicked: Subscription;

  constructor(private eventsService: EventsService) {
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.playerClicked = this.eventsService.playerClicked$.subscribe((userName: string) => {
      this.highlightPlayer(userName);
    });
  }

  ngOnDestroy() {
    this.playerClicked.unsubscribe();
  }

  ngOnInit() {
    this.questionTitle = this.FFQData.text;
    this.answers = this.FFQData.answers;
    this.order = this.FFQData.order;
  }

  highlightPlayer(userName: string) {
    this.highlightedPlayer = userName;
  }

}
