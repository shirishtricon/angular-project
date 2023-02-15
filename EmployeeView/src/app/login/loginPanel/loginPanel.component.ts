import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeServices } from 'src/app/Services/employee.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-loginPanel',
  templateUrl: './loginPanel.component.html',
  styleUrls: ['./loginPanel.component.css'],

})
export class LoginPanelComponent implements OnInit{
  @Input() newRole = '';
  reactiveForm: FormGroup;
  formStatus;
  token: string;

  status: string;
  message: string = null;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      empid: new FormControl(null, Validators.required),
      password: new FormControl(null,  Validators.required)
    });
    this.reactiveForm.statusChanges.subscribe((value) => {
      console.log(value);
      this.formStatus = value;
    });
  }

 constructor(private authService: AuthService, private _router: Router, private employeeServices: EmployeeServices){ }


  onClick() {
    if(this.reactiveForm.valid) {
      this.employeeServices.login(`${this.reactiveForm.value.empid}`, this.reactiveForm.value.password, this.newRole).subscribe((response) => {

        localStorage.setItem('token',response.token);
        this.authService.login(this.newRole);
        const decodedToken = helper.decodeToken(response.token)
        console.log(decodedToken.role);
        if(decodedToken.role === 'HR') {
          this.status = 'done'
          this.message = 'Login Successful'
          this._router.navigate(['hr/AllEmployees'])          
        } else if (decodedToken.role === 'Manager') {
          this.status = 'done'
          this.message = 'Login Successful'
          this._router.navigate(['manager'])
        } else {
          alert('unknown user')
        }
        
       
      }, (error) => {
        this.status = 'undone'
        this.message = 'Invalid Credentials'
      });
 
    } else {
      this.status = 'intermediate'
      this.message = 'Please enter all details'
    }
    
  }

  onSubmit() {
    this.onClick();
    console.log(this.reactiveForm);
    
  }

}
