import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../components/table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  operationsRoute = 'http://192.168.0.17:4000/api/operations';
  constructor(
    private http: HttpClient
  ) { }

  getAllOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.operationsRoute + '/all');
  }

  getOperationById(id: string): Observable<Operation> {
    return this.http.get<Operation>(`${this.operationsRoute}/one?operation_id=${id}`);
  }

  getOperationsByPartnumber(partnumber: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.operationsRoute}/partnumber?partnumber=${partnumber}`);
  }

  getOperationsByRegNum(regNum: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.operationsRoute}/reg_num?reg_num=${regNum}`);
  }

  getOperationsByStatus(status: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.operationsRoute}/status?status=${status}`);
  }

  getOperationsByRecipe(recipe: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.operationsRoute}/recipe?recipe=${recipe}`);
  }

  getOperationsByDateInterval(from: string, to: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.operationsRoute}/date_interval?from=${from}&to=${to}`);
  }
}
