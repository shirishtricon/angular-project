import { NgModule} from '@angular/core';
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { EmployeeCardService } from './employeeGuard.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { AuthGuard } from './auth.guard';
import { AddDepartmentComponent } from './add-department/add-department.component';

const appRoute: Routes = [
    {path: '', component: LoginComponent},
 
    // {path: '', redirectTo: 'Home', pathMatch: 'full'},
        {path: 'hr/AllEmployees', component: AllEmployeesComponent, canActivate: [EmployeeCardService], data: { role: 'HR'}},
        {path: 'manager', component: ManagerViewComponent, canActivate: [EmployeeCardService], data: { role: 'Manager'}},
        {path: 'Employee', component: AddEmployeeComponent},
        {path: 'Department', component: AddDepartmentComponent},
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