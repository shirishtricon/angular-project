import { NgModule} from '@angular/core';
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { EmployeeCardService } from './employeeGuard.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const appRoute: Routes = [
    {path: '', component: LoginComponent},
    // {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'AllEmployees', component: AllEmployeesComponent},
    {path: 'Employee', component: AddEmployeeComponent},
    // canActivate: [EmployeeCardService]
    {path: '**', component:ErrorComponent}

 
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {

}