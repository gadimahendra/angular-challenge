import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
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
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() results = new EventEmitter<any[]>();
  @Output() type = new EventEmitter<any>()


  resultsRef: any[] = []


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private aircraftService: AircraftService,
    private snackbar: MatSnackBar) {
    this.form = this.fb.group({
      type: ['aircraft'],
      input: ['']
    });
  }

  onSearch() {
    const values = this.form.value.input
      .split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v.length > 0);

    console.log('value', this.form.value.type)
    if (this.form.value.type === 'aircraft') {
      this.aircraftService.getByRegistration(values).subscribe((res) => {
        const errors = res.filter((item: any) => item.error === true);
        if (errors.length > 0) {
          // Show snackbar with error messages
          const messages = errors.map((e: any) => e.message).join(', ');
          this.snackbar.open(`Errors: ${messages}`, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
        this.resultsRef = res;
        this.results.emit(res);
      });
    } else {
      this.aircraftService.getByCallsign(values).subscribe((res) => {
        this.results.emit(res);
        const errors = res.filter((item: any) => item.error === true);
        if (errors.length > 0) {
          // Show snackbar with error messages
          const messages = errors.map((e: any) => e.message).join(', ');
          this.snackbar.open(`Errors: ${messages}`, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }

      },

      );
    }
  }

  onSearchTypeChange() {
    this.form.get('input')?.setValue('');
    this.type.emit(this.form.get('type')?.value)
    console.log('results', this.results)
    this.resultsRef.length > 0 ? this.results.emit([]) : ''
  }
}
