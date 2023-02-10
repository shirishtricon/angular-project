import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, Subject, throwError } from 'rxjs';
import { Employee } from '../Model/employees';

@Injectable({providedIn: "root"})
export class EmployeeServices {
    error= new Subject<string>();
    constructor(private http: HttpClient) { }
    
    //Create Emploee in database
    addEmployee(employees: {emp_id: number, name: string, designation: string, experience: number, skills: string, image: string}) {
        console.log(employees);
        const headers = new HttpHeaders({'myHeader': 'proacademy'})
        this.http.post<{name:string}>('https://angularbyshirish-default-rtdb.firebaseio.com/employee.json', employees, {headers:headers})
        .subscribe((res) => {
            console.log(res);     
        }, (err) => {
            this.error.next(err.message);
        });
    }

    //Fetch Employee detail from database

    fetchEmployee() {
        const header = new HttpHeaders()
        .set('content-type','application/json')
        .set('Access-Control-Allow-Origin','*')

        const params = new HttpParams().set('print','pretty').set('pageNum',1)
        return this.http.get<{[key: string]: Employee}>('https://angularbyshirish-default-rtdb.firebaseio.com/employee.json', {'headers': header, params:params})
        .pipe(map((res) => {
          const employees = []
          for(const key in res) {
            if(res.hasOwnProperty(key)) {
              employees.push({...res[key], id: key})
            }
          }
          return employees;
        }), catchError((err) => {
            // write the logic for logging errors
            return throwError(err)
        }));
    }

    //delete Employee from database
    deleteEmployee(id: string) {
        this.http.delete('https://angularbyshirish-default-rtdb.firebaseio.com/employee/'+id+'.json')
        .subscribe();
    }

    // update employee details 
    updateEmployee(id: string, value: Employee) {
        this.http.put('https://angularbyshirish-default-rtdb.firebaseio.com/employee/'+id+'.json', value)
        .subscribe()
    }
}