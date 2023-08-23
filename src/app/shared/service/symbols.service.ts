import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SymbolsService {
  reqUrl = 'https://api.exchangerate.host/symbols';
  constructor(private http: HttpClient) { }

  getSymbols() {
    return this.http.get(this.reqUrl);
  }
}
