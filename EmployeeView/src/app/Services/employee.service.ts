import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Employee } from '../Model/employees';

@Injectable({providedIn: "root"})
export class EmployeeServices {
    error= new Subject<string>();

    token:string = localStorage.getItem('token');
    header = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('token',this.token);


    constructor(private http: HttpClient) { }
    
    //Create Emploee in database
    addEmployee(employees: {name: string, designation: string, experience: number, skills: string, image: string}):Observable<any> {
       return this.http.post<{name:string}>('http://localhost:5000/hr/addEmployee', employees, {headers:this.header})
        
    }

    //Fetch Employee detail from database

    fetchEmployee() {
        

        const params = new HttpParams().set('print','pretty').set('pageNum',1)
        return this.http.get<{[data: string]: Employee}>('http://localhost:5000/hr/employees', {headers: this.header})
        .pipe(map((res) => {

          const employees = [];
    
          for(const data in res) {
            if(res.hasOwnProperty(length)) {
              employees.push({...res[data], id: data})
            }
          }
      
          return employees;
        }), catchError((err) => {
            // write the logic for logging errors
            return throwError(err)
        }));
    }

    //delete Employee from database
    deleteEmployee(id: number) {
        this.http.delete(`http://localhost:5000/hr/delete/${id}`, {'headers': this.header})
        .subscribe();
    }

    // update employee details 
    updateEmployee(id: string, value: any) {
        this.http.put(`http://localhost:5000/hr/edit/${id}`, value, {headers:this.header})
        .subscribe()
    }

    login(emp_id: string, password: string, newRole: string): Observable<any> {
        const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Access-Control-Allow-Origin','*')
        return this.http.post('http://localhost:5000/login', JSON.stringify({ emp_id, password, newRole}), {headers: headers});
    }
}