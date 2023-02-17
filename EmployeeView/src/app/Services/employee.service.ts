import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
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
        return this.http.get<{[data: string]: Employee}>('http://localhost:5000/hr/employees', {'headers': header})
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
    deleteEmployee(id: string) {
        this.http.delete('https://angularbyshirish-default-rtdb.firebaseio.com/employee/'+id+'.json')
        .subscribe();
    }

    // update employee details 
    updateEmployee(id: string, value: Employee) {
        this.http.put('https://angularbyshirish-default-rtdb.firebaseio.com/employee/'+id+'.json', value)
        .subscribe()
    }

    login(emp_id: string, password: string, newRole: string): Observable<any> {
        const header = new HttpHeaders()
        .set('content-type','application/json')
        .set('Access-Control-Allow-Origin','*')
        return this.http.post('http://localhost:5000/login', JSON.stringify({ emp_id, password, newRole}), {headers: header});
    }
}