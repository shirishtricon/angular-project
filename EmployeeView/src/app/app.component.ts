import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeView';

  constructor() {}

  // ngOnInit() {
  //   this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
  //   // Stop the foreground loading after 5s
  //   setTimeout(() => {
  //     this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
  //   }, 5000);
  // }
 
}
