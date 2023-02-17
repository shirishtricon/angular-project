import { Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../Model/employees';
import { EmployeeServices } from '../Services/employee.service';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader"

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

  constructor(private dataService: DataService, private employeeServices: EmployeeServices, private ngxService: NgxUiLoaderService) { }
  allEmployees:Employee[] = [] ;
  filteredEmployees= [];
  @ViewChild('updateForm') form: NgForm;
   
  ngOnInit(){
    this.fetchEmployees();
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

  onDeleteEmployee(id:string) {
    this.ngxService.start();
    this.employeeServices.deleteEmployee(id);
    this.acknowledgement = 'delete';
    this.fetchEmployees();
    this.ngxService.stop()
  }

  setDefaultValues(indx:number, id:string) {
   
   let employee = this.allEmployees[`${indx}`];
   this.form.setValue({
    emp_id:employee.emp_id,
    name: employee.name,
    designation: employee.designation,
    experience: employee.experience,
    skills: employee.skills,
    image: employee.image
   });
   this.currentEmployeeIdStr = id;
   this.currentEmployeeId = employee.emp_id
  }

  onEmployeeUpdate(form) {
    this.ngxService.start()
    let updatedDetails = {
      emp_id: this.currentEmployeeId,
      name: form.value.name,
      designation: form.value.designation,
      experience: form.value.experience,
      skills: form.value.skills,
      image: form.value.image
    };
    this.employeeServices.updateEmployee(this.currentEmployeeIdStr, updatedDetails);
    this.acknowledgement = 'update';
    this.fetchEmployees();
    this.ngxService.stop();
    
  }

}
