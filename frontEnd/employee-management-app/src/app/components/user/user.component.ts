import { Employee } from './../../model/employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployees();
  }


  getEmployees(){
    this.employeeService.getAllEmployees().subscribe({
      next:response =>{
        this.employees = response;
      },
      error:err =>{
       this.toastr.error('Error', 'You can not get Employees', {timeOut: 3000})
      }
    })
  }




}
