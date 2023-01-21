import { Employee } from './../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:8080/api/v1/employees';

  constructor(private http: HttpClient) { }


    // get all employees
    // public getAllEmployees():Observable<Employee[]>{
    //   return this.http.get<Employee[]>(`${this.baseURL}/all`).pipe(
    //     map(response =>{
    //       return response
    //     })
    //   );
    // }

    // get all employees
    public getAllEmployees(pageN:number, sizeN:number):Observable<Employee[]>{
      return this.http.get<Employee[]>(`${this.baseURL}/all?page=${pageN}&size=${sizeN}`).pipe(
        map(response =>{
          return response
        })
      );
    }



     public getEmployeesByKey(key:string,pageN:number, sizeN:number):Observable<Employee[]>{
      return this.http.get<Employee[]>(`${this.baseURL}/search?name=${key}&page=${pageN}&size=${sizeN}`).pipe(
        map(response =>{
          return response
        })
      );
    }


    public getEmployeeLength(): Observable<number>{
      return this.http.get<number>(`${this.baseURL}/employee-size`).pipe(
        map(response => response)
      );
    }

    public getEmployeeByKeySize(key:string):Observable<number>{
      return this.http.get<number>(`${this.baseURL}/key-size?key=${key}`).pipe(
        map(response => response)
      );
    }


    // save employee
    public saveNewEmployee(employee:Employee):Observable<Employee>{
      return this.http.post<Employee>(`${this.baseURL}/save`,employee).pipe(
        map(response =>{
          return response
        })
      )
    }

    // edit employee
    public updateEmployee(employee:Employee, employeeId:number):Observable<Employee>{
      return this.http.put<Employee>(`${this.baseURL}/update/${employeeId}`,employee).pipe(
        map(response =>{
          return response
        })
      )
    }


    // delete employee
    public deleteEmployeeService(employee:Employee):Observable<any>{
      return this.http.delete<void>(`${this.baseURL}/delete/${employee.id}`);
    }



















  // // get all employees
  // public getAllEmployees():Observable<Employee[]>{
  //   let head = new HttpHeaders({
  //     Authorization: sessionStorage.getItem("token").toString()
  //   });
  //   return this.http.get<Employee[]>(`${this.baseURL}/all`, {headers:head}).pipe(
  //     map(response =>{
  //       return response
  //     })
  //   );
  // }


  // // save employee
  // public saveNewEmployee(employee:Employee):Observable<Employee>{
  //   let head = new HttpHeaders({
  //     Authorization: sessionStorage.getItem("token").toString()
  //   });
  //   return this.http.post<Employee>(`${this.baseURL}/save`,employee,{headers:head}).pipe(
  //     map(response =>{
  //       return response
  //     })
  //   )
  // }

  // // edit employee
  // public updateEmployee(employee:Employee, employeeId:number):Observable<Employee>{
  //   let head = new HttpHeaders({
  //     Authorization: sessionStorage.getItem("token").toString()
  //   });
  //   return this.http.put<Employee>(`${this.baseURL}/update/${employeeId}`,employee,{headers:head}).pipe(
  //     map(response =>{
  //       return response
  //     })
  //   )
  // }


  // // delete employee
  // public deleteEmployeeService(employee:Employee):Observable<any>{
  //   let head = new HttpHeaders({
  //     Authorization: sessionStorage.getItem("token").toString()
  //   });
  //   return this.http.delete<void>(`${this.baseURL}/delete/${employee.id}`,{headers:head});
  // }


}
