import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeServices } from '../Services/employee.service';
import { NgForm } from '@angular/forms';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { DepartmentService } from '../Services/department.service';
import { DepartmentModel } from '../Model/departments';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit{
  @ViewChild('departmentForm') form: NgForm;
  departmentAdded: string;
  lastDeptId:number;
  lastDeptName: string;
  error= new Subject<string>();
  allDepartments = []

  constructor(private departmentServices: DepartmentService) { }

  ngOnInit() {
    this.fetchDepartment()
  }
  onDepartmentAdd(form) {
    if(form.valid) {
      let department = {
        dept_name: form.value.dept_name,
        dept_head: form.value.dept_head,
      }
      this.departmentServices.addDepartment(department).subscribe((res) => {
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

  fetchDepartment() {
    this.departmentServices.fetchDepartments().subscribe((departments) => {
      console.log(typeof departments)
      this.allDepartments = [...departments];
      console.log(this.allDepartments)
    }, (err) => {
      throw err;
    })
    
  }
}

