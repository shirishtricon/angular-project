import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-loginPanel',
  templateUrl: './loginPanel.component.html',
  styleUrls: ['./loginPanel.component.css']
})
export class LoginPanelComponent {
 @Input() newRole = '';

 constructor(private authService: AuthService){ }

 login(){
    this.authService.login();
  }
 
}
