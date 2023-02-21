import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeServices } from '../Services/employee.service';
import { NgForm } from '@angular/forms';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  @ViewChild('employeeForm') form: NgForm;
  employeeAdded: string;
  lastEmployeeId;
  lastEmployeeName;
  error= new Subject<string>();

  constructor( private employeeServices: EmployeeServices) { }

  onEmployeeAdd(form) {
    if(form.valid){
      let employee = {
        name: form.value.name,
        designation: form.value.designation,
        experience: form.value.experience,
        skills: form.value.skills,
        image: form.value.image
      }
      this.employeeServices.addEmployee(employee).subscribe((res) => {
        this.employeeAdded = 'Done';
        this.lastEmployeeId = res['result'][0].emp_id;
        this.lastEmployeeName = res['result'][0].name
        console.log(res['result'][0].emp_id);     
      }, (err) => {
          this.error.next(err.message);
          this.employeeAdded = 'Error'
      });
      this.form.reset();
      
    } else {
      this.employeeAdded = 'Empty'
    }
  }
  // onEmployeeAdd(employee: {emp_id:number, name:string, designation: string, experience: number, skills: string, image: string}) {
  //   this.employeeServices.addEmployee(employee);
  //   this.form.reset();
  //   alert('Employee added successfully');
  // }
}
