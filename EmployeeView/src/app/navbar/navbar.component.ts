import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent {
  empValue: string = '';
  token = helper.decodeToken(localStorage.getItem('token'));
  name = this.token.name
  role = this.token.role

  constructor(private dataService: DataService, private authService: AuthService, private _router: Router, private ngxService: NgxUiLoaderService){ }

  searchEmployee(value:string){
    this.empValue = value;
    this.dataService.sendMessage(this.empValue)
  }

  logout(){
    this.authService.logout();
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
      this._router.navigate(['']);
    }, 2000)
  }
}
