import { Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../Model/employees';
import { EmployeeServices } from '../Services/employee.service';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader"
import { DepartmentModel } from '../Model/departments';
import { DepartmentService } from '../Services/department.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit{

  newCriteria: string ='';
  isFetching: boolean = false;
  errorMessage: string = null;
  errorValue: string;
  display: string;
  currentEmployeeId ;
  currentEmployeeIdStr: string;
  acknowledgement: string;
  employeeToBeDeleted: number;
  nums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  allDepartments = [];
  filtertedDept :any;
  model: DepartmentModel = new DepartmentModel();
  defaultExperience = 0;
 

  constructor(private dataService: DataService, 
              private employeeServices: EmployeeServices, 
              private ngxService: NgxUiLoaderService,
              private departmentServices: DepartmentService) { }
  allEmployees:Employee[] = [] ;
  filteredEmployees= [];
  @ViewChild('updateForm') form: NgForm;
   
  ngOnInit(){

      this.fetchEmployees();
      this.fetchDepartments();

    this.dataService.filterMessage$.subscribe(data => {
      
      this.newCriteria = data;
      console.log(this.newCriteria);
      this.filteredEmployees = this.allEmployees.filter(emp => emp.designation === this.newCriteria || emp.name.includes(this.newCriteria))
    })
  }

  isfetchingEmployee() {
    if(this.isFetching) {
      this.ngxService.start();
    } else {
      this.ngxService.stop();
    }
  }

   fetchEmployees() {
    this.ngxService.start();
    this.isFetching = true;
    this.employeeServices.fetchEmployee().subscribe((products) => {

      console.log(typeof products)
      this.allEmployees = products
      this.filteredEmployees = [...this.allEmployees];
      console.log(this.allEmployees)
      this.ngxService.stop();
      this.isFetching = false;
    }, (err) => {
    this.errorMessage = err.message;
   })
  }

  toDeleteEmployee(index: number) {
    let employee = this.allEmployees[`${index}`];
    this.employeeToBeDeleted = employee.emp_id;
  }

  onDeleteEmployee() {
    this.employeeServices.deleteEmployee(this.employeeToBeDeleted);
    this.acknowledgement = 'delete';
    this.fetchEmployees();
    this.ngxService.stop()
  }

  setDefaultValues(indx:number, id:string) {
   
   let employee = this.allEmployees[`${indx}`];
   console.log(employee.dept_name);
   
   this.form.form.patchValue({
    name: employee.name,
    designation: employee.designation,
    experience: employee.experience,
    dept_name: employee.dept_name,
    skills: employee.skills,
    image: employee.image
   });  
   this.currentEmployeeIdStr = id;
   this.currentEmployeeId = employee.emp_id;
  }


  onEmployeeUpdate(form) {
    this.ngxService.start()
    console.log(form);
    
    let updatedDetails = {
  
      name: form.value.name,
      designation: form.value.designation,
      experience: form.value.experience,
      dept_id: `${this.resolveDeptNameToId(form.value.department)}`,
      skills: form.value.skills,
      image: form.value.image
    };
    console.log(updatedDetails);
    
    this.employeeServices.updateEmployee(this.currentEmployeeId, updatedDetails);
    this.acknowledgement = 'update';
    this.fetchEmployees();
    this.ngxService.stop();
    
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

  resolveDeptNameToId(dept_name: string) {
    let filtertedDept = this.allDepartments.filter((dept) => {
      return dept.dept_name === dept_name
    });
    this.filtertedDept = [...filtertedDept];    
    return this.filtertedDept[0].dept_id;
  }

}
