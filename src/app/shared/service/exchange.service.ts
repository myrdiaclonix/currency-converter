import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiUrl = 'https://api.exchangerate.host/convert';

  constructor(private http: HttpClient) { }

  getExchangeRate(from: string, to: string, amount: number): Observable<any> {
    const params = {
      from,
      to,
      amount: amount.toString()
    };

    return this.http.get(this.apiUrl, { params });
  }
}
