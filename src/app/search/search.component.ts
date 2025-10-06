import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AircraftService } from '../aircraft.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() results = new EventEmitter<any[]>();
  @Output() type = new EventEmitter<any>();

  resultsRef: any[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private aircraftService: AircraftService,
    private snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      type: ['aircraft'],
      input: [''],
    });
  }

  onSearch() {
    const values = this.form.value.input
      .split(',')
      .map((v: string) => v.trim());
    console.log('values', values);
    let lastValue = values[values.length - 1];
    let previousValues = values.slice(0, -1);
    console.log('previous values', previousValues);
    if (values.length > 1 && previousValues.includes(lastValue)) {
      this.snackbar.open(
        `Already made api call for ${values[values.length - 1]}`,
        'Close',
        {
          duration: 3000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        }
      );
    } else {
      let apicMethod: 'getByRegistration' | 'getByCallsign';
      this.form.value.type === 'aircraft'
        ? (apicMethod = 'getByRegistration')
        : (apicMethod = 'getByCallsign');

      this.aircraftService[apicMethod](values).subscribe({
        next: (res) => {
          this.resultsRef = res;
          this.results.emit(res);
        },
        error: (err: Error) => {
          this.snackbar.open(`Errors: ${err.message}`, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  onSearchTypeChange() {
    this.form.get('input')?.setValue('');
    this.type.emit(this.form.get('type')?.value);
    console.log('results', this.results);
    this.resultsRef.length > 0 ? this.results.emit([]) : '';
  }
}
