import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'time', 'inputValue', 'from', 'outputValue', 'to', 'exchangeRate'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadData();
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    this.dataSource.data = JSON.parse(sessionStorage.getItem('conversions') || '[]').map((item: { outputValue: string; }) => ({
      ...item,
      outputValue: parseFloat(item.outputValue)
    }));
  }

  customSortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'time':
          return this.compare(a.time, b.time, isAsc);
        case 'outputValue':
          return this.compare(a.outputValue, b.outputValue, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource._updateChangeSubscription();
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
