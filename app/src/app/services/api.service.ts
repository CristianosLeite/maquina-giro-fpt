import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  operationsRoute = 'http://beckend:4000/api/operations';
  constructor(
    private http: HttpClient
  ) { }

  getAllOperations() {
    return this.http.get(this.operationsRoute);
  }

  getOperationById(id: string) {
    return this.http.get(`${this.operationsRoute}?operation_id=${id}`);
  }

  getOperationByPartnumber(partnumber: string) {
    return this.http.get(`${this.operationsRoute}?partnumber=${partnumber}`);
  }

  getOperationByRegNum(regNum: string) {
    return this.http.get(`${this.operationsRoute}?reg_num=${regNum}`);
  }

  getOperationByStatus(status: string) {
    return this.http.get(`${this.operationsRoute}?status=${status}`);
  }

  getOperationByDateInterval(from: string, to: string) {
    return this.http.get(`${this.operationsRoute}?from=${from}&to=${to}`);
  }
}
