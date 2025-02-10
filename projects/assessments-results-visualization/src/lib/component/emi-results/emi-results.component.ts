import { Component, Input, OnInit } from '@angular/core';

import { EMITableAdapter } from '../../model/table-adapter/emi-table-adapter';
import { HighlightService } from '../../services/highlight.service';
import { HighlightableDirective } from '../../directives/highlightable.directive';
import { Question } from '../../model/question';
import { EmiAnswers } from '../../model/emi-answers';
import { Participant } from '../../model/participant';

/**
 * Component displaying result of a extended matching items
 */
@Component({
    selector: 'crczp-emi-results',
    templateUrl: './emi-results.component.html',
    styleUrls: ['./emi-results.component.css'],
})
export class EMIResultsComponent extends HighlightableDirective implements OnInit {
    @Input() question: Question;
    @Input() isTest: boolean;
    tableAdapters: EMITableAdapter[] = [];

    constructor(highlightService: HighlightService) {
        super(highlightService);
    }

    ngOnInit(): void {
        this.tableAdapters = this.question.answers.map((answer) => new EMITableAdapter(answer as EmiAnswers));
    }

    /**
     * Calls service to highlight the answer
     * @param $event mouse event
     */
    highlighted($event: { participant: Participant; mouseEvent: MouseEvent }): void {
        this.highlight($event.participant, $event.mouseEvent);
    }
}
