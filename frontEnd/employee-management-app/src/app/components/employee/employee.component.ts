import { Employee } from './../../model/employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    // this.getEmployees();
  }


  //  getEmployees(){
  //   this.employeeService.getAllEmployees().subscribe(
  //     data =>{
  //       this.employees = data
  //     }
  //   )
  //  }





}
