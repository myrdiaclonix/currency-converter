import { Component, OnInit } from '@angular/core';
import { SymbolsService } from 'src/app/shared/service/symbols.service';
import { CurrencySymbol } from '../currency-list/currency-list.component';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
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
  convertedAmount: number | null = null;

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
        this.convertedAmount = response.result;
      },
      (error) => {
        console.error('Erro ao converter o valor:', error);
      }
    );
  }
}
