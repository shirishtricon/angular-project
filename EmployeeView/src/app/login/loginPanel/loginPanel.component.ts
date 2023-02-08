import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginPanel',
  templateUrl: './loginPanel.component.html',
  styleUrls: ['./loginPanel.component.css'],

})
export class LoginPanelComponent implements OnInit{
  @Input() newRole = '';
  reactiveForm: FormGroup;
  formStatus;

  crdentials = {
    empid: 123,
    password:'admin'
  }

  

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


  invalidCondition() {
    return (Number(this.reactiveForm.get('empid').value) != this.crdentials.empid && this.reactiveForm.get('password').value != this.crdentials.password && this.reactiveForm.valid)
  }
 
  
 constructor(private authService: AuthService, private _router: Router){ }

 login(){
    this.authService.login();
  }

  onClick() {
    if(this.reactiveForm.valid) {

      if(Number(this.reactiveForm.value.empid) === this.crdentials.empid && this.reactiveForm.value.password === this.crdentials.password){
        this.login();
        this._router.navigate(['AllEmployees'])
      } else {
        alert('invalid credentials')
      }

      
    } else {
      alert('Please enter all details');
    }
    
  }

  onSubmit() {
    this.onClick();
    console.log(this.reactiveForm);
    
  }

}
