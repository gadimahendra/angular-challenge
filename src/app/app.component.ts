import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AircraftsResponsesComponent } from './aircrafts-responses/aircrafts-responses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchComponent,
    AircraftsResponsesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'time-matters-aircraft';

  results: any[] = [];
  type: string = 'aircraft'


  handleResults(data: any[]) {
    console.log('data', data)
    this.results = data;
  }

  handleType(event: any) {
    console.log('type', event.value)
    this.type = event
  }
}
