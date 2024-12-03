import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { ReportService } from '../../services/report.service';
import { Operation } from '../table/table.component';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  from = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);
  to = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  status: string = '';

  constructor(
    private apiService: ApiService,
    private reportService: ReportService
  ) {
    this.apiService.getOperationsByDateInterval(this.from.toISOString(), this.to.toISOString()).subscribe(data => {
      this.apiService.data.emit(data);
      this.reportService.setData(data);
    });
  }

  private setAndEmitData(data: Operation[]) {
    this.reportService.setData(data);
    this.apiService.data.emit(data);
  }

  onStartDateChange(date: Date) {
    this.from = date;
    this.apiService.getOperationsByDateInterval(this.from.toISOString(), this.to.toISOString())
      .subscribe(data => {
        this.setAndEmitData(data);
      });
  }

  onEndDateChange(date: Date) {
    this.to = date;
    this.apiService.getOperationsByDateInterval(this.from.toISOString(), this.to.toISOString())
      .subscribe(data => {
        this.setAndEmitData(data);
      });
  }

  filterPartnumber(e: Event) {
    const partnumber = (e.target as HTMLInputElement).value;
    this.apiService.getOperationsByDateInterval(this.from.toISOString(), this.to.toISOString()).subscribe(data => {
      if (partnumber === '') {
        this.setAndEmitData(data);
        return;
      }
      this.setAndEmitData(data.filter(operation => operation.partnumber === partnumber));
    });
  }

  filterRegNum(e: Event) {
    const regNum = (e.target as HTMLInputElement).value;
    const data = this.apiService.getOperationsByDateInterval(this.from.toISOString(), this.to.toISOString()).subscribe(data => {
      if (regNum === '') {
        this.setAndEmitData(data);
        return;
      }
      this.setAndEmitData(data.filter(operation => operation.reg_num === regNum));
    });
  }

  filterRecipe(e: Event) {
    const recipe = (e.target as HTMLInputElement).value.toUpperCase();
    const data = this.apiService.getOperationsByDateInterval(this.from.toISOString(), this.to.toISOString()).subscribe(data => {
      if (recipe === '') {
        this.setAndEmitData(data);
        return;
      }
      this.setAndEmitData(data.filter(operation => operation.recipe.toUpperCase() === recipe));
    });
  }

  filterStatus() {
    const status = this.status === 'ok' ? true : false;
    const data = this.apiService.getOperationsByDateInterval(this.from.toISOString(), this.to.toISOString()).subscribe(data => {
      if (this.status === '') {
        this.setAndEmitData(data);
        return;
      }
      this.setAndEmitData(data.filter(operation => operation.status_ok === status));
    });
  }

  exportReport() {
    this.reportService.exportExcel();
  }
}
