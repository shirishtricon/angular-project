import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeServices } from '../Services/employee.service';
import { NgForm } from '@angular/forms';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { DepartmentService } from '../Services/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  @ViewChild('departmentForm') form: NgForm;
  departmentAdded: string;
  lastDeptId:number;
  lastDeptName: string;
  error= new Subject<string>();

  constructor(private departmentService: DepartmentService) { }
  onDepartmentAdd(form) {
    if(form.valid) {
      let department = {
        dept_name: form.value.dept_name,
        dept_head: form.value.dept_head,
      }
      this.departmentService.addDepartment(department).subscribe((res) => {
        this.departmentAdded = 'Done';
        this.lastDeptId = res['result'][0].dept_id;
        this.lastDeptName = res['result'][0].dept_name
        console.log(res['result'][0].dept_id);     
      }, (err) => {
          this.error.next(err.message);
          this.departmentAdded = 'Error'
      });
      this.form.reset();
      
    } else {
    this.departmentAdded = 'Empty'
    }
  } 
}

