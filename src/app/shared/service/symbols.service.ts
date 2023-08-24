import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SymbolsService {
  private apiUrl = 'https://api.exchangerate.host/symbols';

  constructor(private http: HttpClient) { }

  getSymbols(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
