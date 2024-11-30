import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

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
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  ELEMENT_DATA: Operation[] = [];
  dataSource = new MatTableDataSource<Operation>(this.ELEMENT_DATA);
  displayedColumns: string[] = [
    'operation_id',
    'reg_num',
    'partnumber',
    'status_ok',
    'qty_torque',
    'recipe',
    'createdat'
  ];

  constructor(
    private apiService: ApiService
  ) {
    this.apiService.getAllOperations().subscribe((data: Operation[]) => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource<Operation>(this.ELEMENT_DATA);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
