import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CurrencyConverter';
  menuTab = ['Listagem de Moedas', 'Conversão de Moedas', 'Histórico de Conversões'];
}
