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

  page:number = 1;
  pageLength: number = 5;  // pageSize  -> select
  totalOrder:number = 0;  // collectionSize, the total number of orders



  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployees();
  }


  getEmployees(){
    this.employeeService.getEmployeeLength().subscribe(data =>{
      this.totalOrder = data
    })
    this.employeeService.getAllEmployees(this.page-1,this.pageLength).subscribe({
      next:response =>{
        this.employees = response;
      },
      error:err =>{
       this.toastr.error('Error', 'You can not get Employees', {timeOut: 3000})
      }
    })
  }


  doing(){
    this.getEmployees();
  }


  pageSize(event:Event){
    this.pageLength = +(<HTMLInputElement>event.target).value;
    this.getEmployees();
  }


}
