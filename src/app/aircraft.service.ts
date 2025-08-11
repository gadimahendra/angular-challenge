import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',

})
export class AircraftService {

  baseUrl: any = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getByRegistration(codes: string[]) {
    return this.getMultiple(codes, 'aircraft');
  }



  getByCallsign(codes: string[]) {
    return this.getMultiple(codes, 'callsign');
  }

  private getMultiple(codes: string[], endpoint: string) {
    const requests = codes.map(code =>
      this.http.get(`${this.baseUrl}/${endpoint}/${code}`).pipe(
        catchError(error => of({
          error: true,
          message: error.message || 'Not found',
          code
        }))
      )
    );

    return forkJoin(requests);
  }

}
