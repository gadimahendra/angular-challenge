import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, share, shareReplay } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AircraftService {
  baseUrl: any = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getByRegistration(codes: string[]) {
    return this.getMultiple(codes, 'aircraft');
  }

  getByCallsign(codes: string[]) {
    return this.getMultiple(codes, 'callsign');
  }

  private airCraftResults = new Map<string, Observable<any>>();
  private lastvalue: null | string = null;

  getMultiple(codes: string[], type: string) {
    if (this.lastvalue != type) {
      this.airCraftResults.clear();
      this.lastvalue = type;
    }

    let results: Observable<any>[] = [];

    for (let i = 0; i < codes.length; i++) {
      if (!this.airCraftResults.has(codes[i])) {
        let req = this.http
          .get(`${this.baseUrl}/${type}/${codes[i]}`)
          .pipe(shareReplay(1));
        this.airCraftResults.set(codes[i], req);
      }
      let obs = this.airCraftResults.get(codes[i]);
      if (obs) {
        results.push(obs);
      }
    }
    return forkJoin(results);
  }
}
