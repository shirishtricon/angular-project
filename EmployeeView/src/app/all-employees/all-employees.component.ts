import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent {

  newCriteria: string ='';

  constructor(private dataService: DataService) { }
   allEmployees = [
    { emp_id:11, name: "Vikram", designation: "Associate Software Engineer", experience: 5, skills: 'C++', image: 'assets/images/vikram.jpg'},
    { emp_id:12, name: "Saurabh", designation: "Senior Principal Engineer", experience: 6, skills: 'Angular', image: 'assets/images/saurabh.jpg'},
    { emp_id:13, name: "Manoj Kumar", designation: "Software Engineer", experience: 6, skills: 'Node.js', image: 'assets/images/manoj.jpeg'},
    { emp_id:14, name: "Yogendra", designation: "Senior Software Engineer", experience: 8, skills: 'C#', image: 'assets/images/yogendra.jpg'},
    { emp_id:15, name: "Sandeep", designation: "Senior Software Engineer", experience: 8, skills: 'React.js', image: 'assets/images/sandeep.jpeg'},
    { emp_id:16, name: "Gagan", designation: "Senior Software Engineer", experience: 8, skills: 'Java', image: 'assets/images/cariappa.jpeg'},
   ];

   filteredEmployees = [...this.allEmployees];

   ngOnInit(){
    this.dataService.filterMessage$.subscribe(data => {
      this.newCriteria = data;
      console.log(this.newCriteria);
      this.filteredEmployees = this.allEmployees.filter(emp => emp.designation === this.newCriteria || emp.name.includes(this.newCriteria))
    })
   }
}
