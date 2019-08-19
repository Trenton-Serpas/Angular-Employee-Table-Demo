import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, EmployeeLogin } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getLogins() {
      return this.http.get<EmployeeLogin[]>(environment.baseUrl + '/employees/login');
    }

    getEmployees() {
      return this.http.get<Employee[]>(environment.baseUrl + '/employees/list' );
    }

    getEmployeeByID(id: number) {
      return this.http.get<Employee[]>(environment.baseUrl + '/employees/byID/' + id);
    }

    addEmployee(employee: Employee) {
      return this.http.post(environment.baseUrl + '/employees/add', employee);
    }

    editEmployee(employee: Employee) {
      return this.http.put(environment.baseUrl + '/employees/edit', employee);
    }
}
