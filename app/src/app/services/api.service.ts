import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../components/table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  operationsRoute = 'http://192.168.0.17:4000/api/operations';
  @Output() data = new EventEmitter<Operation[]>();

  constructor(
    private http: HttpClient
  ) { }

  getAllOperations(): Observable<Operation[]> {
    const data = this.http.get<Operation[]>(this.operationsRoute + '/all');
    data.subscribe(data => {
      this.data.emit(data);
    });
    return data;
  }

  getOperationById(id: string): Observable<Operation> {
    return this.http.get<Operation>(`${this.operationsRoute}/one?operation_id=${id}`);
  }

  getOperationsByPartnumber(partnumber: string): Observable<Operation[]> {
    const data = this.http.get<Operation[]>(`${this.operationsRoute}/partnumber?partnumber=${partnumber}`);
    data.subscribe(data => {
      this.data.emit(data);
    });
    return data;
  }

  getOperationsByRegNum(regNum: string): Observable<Operation[]> {
    const data = this.http.get<Operation[]>(`${this.operationsRoute}/reg_num?reg_num=${regNum}`);
    data.subscribe(data => {
      this.data.emit(data);
    });
    return data;
  }

  getOperationsByStatus(status: string): Observable<Operation[]> {
    const data = this.http.get<Operation[]>(`${this.operationsRoute}/status?status=${status}`);
    data.subscribe(data => {
      this.data.emit(data);
    });
    return data;
  }

  getOperationsByRecipe(recipe: string): Observable<Operation[]> {
    const data = this.http.get<Operation[]>(`${this.operationsRoute}/recipe?recipe=${recipe}`);
    data.subscribe(data => {
      this.data.emit(data);
    });
    return data;
  }

  getOperationsByDateInterval(from: string, to: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.operationsRoute}/date_interval?from=${from}&to=${to}`);
  }
}
