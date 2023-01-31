import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent {
  empValue: string = '';

  constructor(private dataService: DataService, private authService: AuthService){ }

  searchEmployee(value:string){
    this.empValue = value;
    this.dataService.sendMessage(this.empValue)
  }

  logout(){
    this.authService.logout();
  }
}
