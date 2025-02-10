import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMITableAdapter } from '../../../model/table-adapter/emi-table-adapter';
import { Participant } from '../../../model/participant';

/**
 * Component displaying table of extended matching items result
 */
@Component({
    selector: 'crczp-emi-results-table',
    templateUrl: './emi-table.component.html',
    styleUrls: ['./../../emi-mcq-table-shared.component.css'],
})
export class EmiTableComponent implements OnInit {
    @Input() tableData: EMITableAdapter;
    @Input() isTest: boolean;
    @Output() highlighted: EventEmitter<{ participant: Participant; mouseEvent: MouseEvent }> = new EventEmitter();

    displayedColumns = ['option', 'sum', 'percentage', 'answers'];
    dataSource;

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.tableData.rows);
    }

    /**
     * Calls service to highlight the answer
     * @param participant
     * @param $event mouse event
     */
    onHighlight(participant: Participant, $event: MouseEvent): void {
        this.highlighted.emit({ participant: participant, mouseEvent: $event });
    }
}
