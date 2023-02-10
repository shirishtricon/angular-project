import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeServices } from '../Services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  @ViewChild('employeeForm') form: NgForm;
  employeeAdded: boolean = false;
  constructor( private employeeServices: EmployeeServices) { }

  onEmployeeAdd(form) {
    if(form.valid){
      let employee = {
        emp_id: form.value.emp_id,
        name: form.value.name,
        designation: form.value.designation,
        experience: form.value.experience,
        skills: form.value.skills,
        image: form.value.image
      }
      this.employeeServices.addEmployee(employee);
      this.form.reset();
      this.employeeAdded = true
    } else {
      this.employeeAdded = false
    }
  }
  // onEmployeeAdd(employee: {emp_id:number, name:string, designation: string, experience: number, skills: string, image: string}) {
  //   this.employeeServices.addEmployee(employee);
  //   this.form.reset();
  //   alert('Employee added successfully');
  // }
}
