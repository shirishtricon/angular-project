import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Employee } from '../Model/employees';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  error= new Subject<string>();

  constructor(private http: HttpClient) { }

  addDepartment(department: {dept_name: string, dept_head:string }):Observable<any> {
    let token = localStorage.getItem('token');
    let header = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('token',token)
      return this.http.post<{name:string}>('http://localhost:5000/hr/addDepartment', department, {headers:header})    
  }

  fetchDepartments() {
    let token = localStorage.getItem('token');
    let header = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('token',token)
    const params = new HttpParams().set('print','pretty').set('pageNum',1)
    return this.http.get<{[data: string]: Employee}>('http://localhost:5000/hr/departments', {headers: header})
    .pipe(map((res) => {
      const departments = [];
      for(const data in res) {
        if(res.hasOwnProperty(length)) {
          departments.push({...res[data], id: data})
        }
      }
      return departments;
    }), catchError((err) => {
        return throwError(err)
    }));
  }
}
