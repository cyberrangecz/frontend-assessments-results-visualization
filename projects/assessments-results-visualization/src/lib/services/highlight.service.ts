import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Participant } from '../model/participant';

/**
 * Service holding state of highlighted participants
 */
@Injectable()
export class HighlightService {
    private highlightedParticipantSubject$ = new BehaviorSubject<Participant>(undefined);
    /**
     * Selected participant whose answers should be highlighted
     */
    highlightedParticipant$ = this.highlightedParticipantSubject$.asObservable();

    /**
     * Selects participant to highlight his answers
     * @param participant participant whose answers should be highlighted
     */
    highlight(participant: Participant): void {
        if (this.isAlreadyHighlighted(participant)) {
            this.highlightedParticipantSubject$.next(undefined);
        } else {
            this.highlightedParticipantSubject$.next(participant);
        }
    }

    /**
     * Clears highlighted player
     */
    clear(): void {
        this.highlightedParticipantSubject$.next(null);
    }

    private isAlreadyHighlighted(participant: Participant): boolean {
        const highlighted = this.highlightedParticipantSubject$.getValue();
        return highlighted && participant.userRefId === highlighted.userRefId;
    }
}
