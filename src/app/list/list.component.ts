import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MatTableDataSource } from '@angular/material';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [ 'Name', 'Email'];
  dataSource = new MatTableDataSource<Employee>();

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(rs => this.dataSource.data = rs['data']);
  }

}
