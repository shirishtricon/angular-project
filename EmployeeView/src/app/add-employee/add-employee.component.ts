import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  constructor( private http: HttpClient) { }

  onEmployeeAdd(employee: {emp_id:number, name:string, designation: string, experience: string, skills: string, image: string}) {
    this.http.post<{name:string}>('https://angularbyshirish-default-rtdb.firebaseio.com/employee.json', employee)
        .subscribe((res) => {
            console.log(res);     
        })
  }
}
