import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  employeeInfo: FormGroup;
  employeeId: number; // this will be falsey if we are adding a new user
  sub: Subscription;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    // there are a lot of unused validators but they are left in for reliability/readability
    this.employeeInfo = this.fb.group({
      firstName: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(35),
        Validators.pattern('^[a-zA-Z]*$')
      ]),
      lastName: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(35),
        Validators.pattern('^[a-zA-Z]*$')
      ]),
      address: new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      city: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      state: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.pattern('^[a-zA-Z]*$')
      ]),
      zip: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$')
      ]),
      homePhone: new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
      ]),
      cellPhone: new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
      ]),
      email: new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9@.]*$')
      ]),
    });
    this.sub = this.route.params.subscribe(params => {
      this.employeeId = +params['id'];
    });
    if (typeof this.employeeId === 'number' && this.employeeId) { // if we are editing
      this.employeeService.getEmployeeByID(this.employeeId).subscribe(rs => {
        this.employeeInfo.controls.firstName.setValue(rs['data'][0].FIRST_NAME);
        this.employeeInfo.controls.lastName.setValue(rs['data'][0].LAST_NAME);
        this.employeeInfo.controls.address.setValue(rs['data'][0].ADDRESS);
        this.employeeInfo.controls.city.setValue(rs['data'][0].CITY);
        this.employeeInfo.controls.state.setValue(rs['data'][0].STATE);
        this.employeeInfo.controls.zip.setValue(rs['data'][0].ZIP);
        this.employeeInfo.controls.homePhone.setValue(rs['data'][0].HOME_PHONE);
        this.employeeInfo.controls.cellPhone.setValue(rs['data'][0].CELL_PHONE);
        this.employeeInfo.controls.email.setValue(rs['data'][0].EMAIL);
      });
    }
  }

  saveChanges() {
    const employee: Employee = {
      firstName: this.employeeInfo.get('firstName').value,
      lastName: this.employeeInfo.get('lastName').value,
      address: this.employeeInfo.get('address').value,
      city: this.employeeInfo.get('city').value,
      state: this.employeeInfo.get('state').value,
      zip: this.employeeInfo.get('zip').value,
      homePhone: this.employeeInfo.get('homePhone').value,
      cellPhone: this.employeeInfo.get('cellPhone').value,
      email: this.employeeInfo.get('email').value,
      id: this.employeeId
    };

    if (typeof this.employeeId === 'number' && this.employeeId) { // if we are editing
      this.employeeService.editEmployee(employee).subscribe(
        data  => {
          this.router.navigateByUrl('/list');
        }
      );
    } else { // we are adding
      this.employeeService.addEmployee(employee).subscribe(
        data  => {
          this.router.navigateByUrl('/list');
        }
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
