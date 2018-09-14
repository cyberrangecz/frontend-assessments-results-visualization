import { Component } from '@angular/core';
import { MOCK_DATA } from './mocks/results.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = MOCK_DATA;
}
