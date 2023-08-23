import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

export interface CurrencySymbol {
  code: string;
  desc: string;
}

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['code', 'description'];
  dataSource: MatTableDataSource<CurrencySymbol>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currencySymbols: CurrencySymbol[] = [];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    const requestUrl = 'https://api.exchangerate.host/symbols';
    this.http.get<any>(requestUrl).subscribe(res => {
      this.currencySymbols = Object.keys(res.symbols).map((code) => ({
        code,
        desc: res.symbols[code].description
      }));
      this.dataSource.data = this.currencySymbols;
      console.log(this.currencySymbols);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe((sort: Sort) => {
      if (sort.active === 'description') {
        this.dataSource.data = this.currencySymbols.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          return this.compare(a.desc, b.desc, isAsc);
        });
      }
    });
  }

  compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
