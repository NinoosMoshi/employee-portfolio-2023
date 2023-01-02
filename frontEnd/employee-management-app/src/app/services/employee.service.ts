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
  public getAllEmployees():Observable<Employee[]>{
    let head = new HttpHeaders({
      Authorization: sessionStorage.getItem("token").toString()
    });
    return this.http.get<Employee[]>(`${this.baseURL}/all`, {headers:head}).pipe(
      map(response =>{
        return response
      })
    );
  }


  // save employee
  public saveNewEmployee(employee:Employee):Observable<Employee>{
    let head = new HttpHeaders({
      Authorization: sessionStorage.getItem("token").toString()
    });
    return this.http.post<Employee>(`${this.baseURL}/save`,employee,{headers:head}).pipe(
      map(response =>{
        return response
      })
    )
  }



}
