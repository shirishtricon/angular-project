import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Employee } from '../Model/employees';

@Injectable({providedIn: "root"})
export class EmployeeServices {
  error= new Subject<string>();


  constructor(private http: HttpClient) { }
    
  //Create Emploee in database
  addEmployee(employees: {name: string, designation: string, experience: number, dept_id:string, skills: string, image: string}):Observable<any> {
    let token = localStorage.getItem('token');
    let header = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('token',token)
      return this.http.post<{name:string}>('http://localhost:5000/hr/addEmployee', employees, {headers:header})
      
  }

    //Fetch Employee detail from database
  fetchEmployee() {
    let token = localStorage.getItem('token');
    let header = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('token',token)
    const params = new HttpParams().set('print','pretty').set('pageNum',1)
    return this.http.get<{[data: string]: Employee}>('http://localhost:5000/hr/employees', {headers: header})
    .pipe(map((res) => {
      const employees = [];
      for(const data in res) {
        if(res.hasOwnProperty(length)) {
          employees.push({...res[data], id: data})
        }
      }
      return employees;
    }), catchError((err) => {
        return throwError(err)
    }));
  }

  //delete Employee from database
  deleteEmployee(uuid: string) {
    let token = localStorage.getItem('token');
    let header = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('token',token)
      this.http.delete(`http://localhost:5000/hr/delete/${uuid}`, {'headers': header})
      .subscribe();
  }

  // update employee details 
  updateEmployee(uuid: string, value: any) {
    let token = localStorage.getItem('token');
    let header = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('token',token)
    this.http.put(`http://localhost:5000/hr/edit/${uuid}`, value, {headers:header})
    .subscribe()
  }

  login(emp_id: string, password: string, newRole: string): Observable<any> {
    const headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    return this.http.post('http://localhost:5000/login', JSON.stringify({ emp_id, password, newRole}), {headers: headers});
  }
}