import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeLogin } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo: FormGroup;
  failed: boolean;

  constructor(private employeeService: EmployeeService, private router: Router, private authGuard: AuthGuard) { }

  ngOnInit() {
    this.loginInfo = new FormGroup({
      email: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(35),
        Validators.pattern('^[a-zA-Z0-9@.]*$')
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(35),
        Validators.pattern('^[a-zA-Z0-9]*$')
      ]),
    });
    this.failed = false;
  }

  attemptLogin() {
    const attempt: EmployeeLogin = {
      email: this.loginInfo.get('email').value,
      password: this.loginInfo.get('password').value
    };

    this.employeeService.getLogins().subscribe(
      rs => {
        console.log(rs);
        const match = rs['data'].find(x => x.EMAIL === attempt.email);
        if (match && match.PASSWORD === attempt.password) {
          this.authGuard.isAuthenticated = true;
          this.router.navigateByUrl('/list');
        }
      }
    );
    this.failed = true;
  }
}
