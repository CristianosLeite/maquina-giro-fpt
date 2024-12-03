import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';

export interface Operation {
  operation_id: number;
  reg_num: string;
  partnumber: string;
  status_ok: boolean;
  qty_torque: number;
  recipe: string;
  createdat: string;
  updatedat: string;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Operation>([]);
  displayedColumns: string[] = [
    'operation_id',
    'reg_num',
    'partnumber',
    'status_ok',
    'qty_torque',
    'recipe',
    'createdAt'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService
  ) {
      this.apiService.data.subscribe(data => {
        this.dataSource = new MatTableDataSource<Operation>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
