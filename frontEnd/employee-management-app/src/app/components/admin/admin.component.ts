import { DeleteComponent } from './admin-components/delete/delete.component';
import { SaveComponent } from './admin-components/save/save.component';
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

  @ViewChild(SaveComponent) saveComponent:SaveComponent;
  @ViewChild(DeleteComponent) deleteComponent:DeleteComponent;


  employees: Employee[];
  selectedEmployee:Employee = new Employee;

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
       this.toastr.error('Error', 'You can not get Employees', {timeOut: 2000})
      }
    })
  }



   createEmployeeRequest(){
     this.selectedEmployee = new Employee();
     this.saveComponent.showEmployeeModal();
   }


   editEmployeeRequest(item:Employee){
    // it will take a copy of employee Object, because when you do a edit a field and you change your mind,
    // at that time the employee list will be changed, so to prevent this happen we do copy.
      this.selectedEmployee = Object.assign({}, item);

      this.saveComponent.showEmployeeModal();
  }

  deleteEmployeeRequest(item:Employee){
     this.selectedEmployee = item;
     this.deleteComponent.showDeleteModal();

  }


   saveEmployeeWatcher(employee:Employee){
    let itemIndex = this.employees.findIndex(i => i.id === employee.id)
    // console.log(itemIndex);    // 3 index of employee
    // console.log(employee.id)   // 5 from database
    // console.log(this.employees.findIndex(i =>i.id))  // 0

    if(itemIndex !== -1){
       this.employees[itemIndex] = employee;
    }else{
      this.employees.push(employee);
    }

   }



   deleteEmployeeTemp(){
    let itemIndex = this.employees.findIndex(item => item.id === this.selectedEmployee.id);

    this.employeeService.deleteEmployeeService(this.selectedEmployee).subscribe({
      next:response =>{
        this.employees.splice(itemIndex, 1);
      },
      error:err =>{
        this.toastr.error('Error', 'There is some error', {timeOut: 2000})
      }
    })

   }






}
