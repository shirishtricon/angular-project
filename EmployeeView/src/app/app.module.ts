import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { FilterComponent } from './filter/filter.component';
import { HeadingComponent } from './heading/heading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginPanelComponent } from './login/loginPanel/loginPanel.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './auth.service';
import { EmployeeCardService } from './employeeGuard.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AllEmployeesComponent,
    FilterComponent,
    HeadingComponent,
    LoginComponent,
    LoginPanelComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, EmployeeCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
