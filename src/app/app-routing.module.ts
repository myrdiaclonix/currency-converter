import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CurrencyListComponent } from './views/currency-list/currency-list.component';
import { ExchangeComponent } from './views/exchange/exchange.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'currency-list',
    component: CurrencyListComponent
  },
  {
    path: 'exchange',
    component: ExchangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
