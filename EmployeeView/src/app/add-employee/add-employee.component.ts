import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeServices } from '../Services/employee.service';
import { NgForm } from '@angular/forms';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { DepartmentService } from '../Services/department.service';
import { DepartmentModel } from '../Model/departments';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  @ViewChild('employeeForm') form: NgForm;
  employeeAdded: string;
  lastEmployeeId;
  lastEmployeeName;
  error= new Subject<string>();
  nums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  defaultExperience = 0;
  defaultDepartment = 'select';
  allDepartments = [];
  filtertedDept :any;
  model: DepartmentModel = new DepartmentModel()

  constructor( private employeeServices: EmployeeServices, private departmentServices: DepartmentService) { }

  ngOnInit() {
    this.fetchDepartments();
  }

  onEmployeeAdd(form) {
    if(form.valid){
      console.log(form);
      
      let employee = {
        name: form.value.name,
        designation: form.value.designation,
        experience: form.value.experience,
        dept_id: `${this.resolveDeptNameToId(form.value.department)}`,
        skills: form.value.skills,
        image: form.value.image,
    
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

  fetchDepartments() {
    this.departmentServices.fetchDepartments().subscribe((departments) => {
      console.log(typeof departments)
      this.allDepartments = [...departments];
      console.log(this.allDepartments)
    }, (err) => {
      throw err;
    })
  }

  resolveDeptNameToId(dept_name:string): number {
   let filtertedDept = this.allDepartments.filter((dept) => {
      return dept.dept_name === dept_name
    });
    this.filtertedDept = [...filtertedDept];    
    return this.filtertedDept[0].dept_id;
  }

}
