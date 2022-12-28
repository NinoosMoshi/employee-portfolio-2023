import { Employee } from './../model/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:8080/api/v1/employees';

  constructor(private http: HttpClient) { }


  public getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseURL}/all`).pipe(
      map(response =>{
        return response
      })
    );
  }



}
