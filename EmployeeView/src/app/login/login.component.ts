import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  role: string = '';

  hrDetails = {
    emp_id: 1223,
    password: '123'
  }

  hrClick() {
    this.role = 'HR';
  } 
  
  managerClick() {
    this.role = 'Manager'
  }
}
