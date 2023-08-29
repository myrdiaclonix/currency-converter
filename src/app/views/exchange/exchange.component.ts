import { Component, OnInit } from '@angular/core';
import { SymbolsService } from 'src/app/shared/service/symbols.service';
import { CurrencySymbol } from '../currency-list/currency-list.component';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExchangeService } from 'src/app/shared/service/exchange.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ExchangeComponent implements OnInit {
  symbols: any;
  value = 0;
  convertedValue = 0;

  firstSymbolControl = new FormControl<CurrencySymbol | null>(null, Validators.required);
  secondSymbolControl = new FormControl<CurrencySymbol | null>(null, Validators.required);

  constructor(private symbolsService: SymbolsService, private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  getDataFromApi(): void {
    this.symbolsService.getSymbols().subscribe(
      (response) => {
        this.symbols = Object.keys(response.symbols).map((code) => ({
          code,
          desc: response.symbols[code].description
        }));
      },
      (error) => {
        console.error('Erro ao obter dados da API:', error);
      }
    );
  }

  convertCurrency(): void {
    if (!this.firstSymbolControl.value || !this.secondSymbolControl.value || this.value <= 0) {
      return;
    }

    const from = this.firstSymbolControl.value.code;
    const to = this.secondSymbolControl.value.code;

    this.exchangeService.getExchangeRate(from, to, this.value).subscribe(
      (response) => {
        this.convertedValue = response.result;

        // Salvando na session storage.
        if (this.convertedValue !== 0) {
          this.saveSessionData(from, to, this.value, this.convertedValue, response.info.rate);
        }
      },
      (error) => {
        console.error('Erro ao converter o valor:', error);
      }
    );
  }

  saveSessionData(from: string, to: string, inputValue: number, outputValue: number, exchangeRate: number): void {
    const currentDate = new Date();

    const conversionData = {
      date: currentDate.toISOString().slice(0, 10),
      time: currentDate.toISOString().slice(11, 19),
      from,
      inputValue,
      to,
      outputValue,
      exchangeRate
    };

    const history = JSON.parse(sessionStorage.getItem('conversions') || '[]');
    history.push(conversionData);
    sessionStorage.setItem('conversions', JSON.stringify(history));
  }

  getConversionHistory(): any[] {
    return JSON.parse(sessionStorage.getItem('conversions') || '[]');
  }
}
