import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './../../model/employee';
import { EmployeeService } from './../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AddComponent } from './admin-components/add/add.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(AddComponent)
  addTemp:AddComponent

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


  receivedFromAdd(employeeTemp:Employee){
    let itemIndex = this.employees.findIndex(item => item.id === employeeTemp.id);

    // console.log( 'this itemIndex: '+ itemIndex)  // -1
    // console.log( 'this item.id: '+ this.employees.findIndex(item => item.id)) // 0
    // console.log( 'this employeeTemp: '+ employeeTemp.id) // 7

    if(itemIndex !== -1){
      this.employees[itemIndex] = employeeTemp;
    }else{
      this.employees.push(employeeTemp);
    }

  }



  saveEmployee(){
    this.addTemp.showAddModal();
  }









}
