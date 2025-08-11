import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-aircrafts-responses',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './aircrafts-responses.component.html',
  styleUrl: './aircrafts-responses.component.scss'
})
export class AircraftsResponsesComponent {
  @Input() results: any = []
  @Input() type: string = 'aircraft'

}
