import { Component } from '@angular/core';
import { EmployeeServices } from '../Services/employee.service';
import { AllEmployeesComponent } from '../all-employees/all-employees.component';

import { DataService } from '../data.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {

  constructor() { }

  
  fetchEmployees() {
    
  }
}
