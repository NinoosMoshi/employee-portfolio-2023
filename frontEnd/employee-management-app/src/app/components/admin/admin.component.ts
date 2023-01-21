import { DeleteComponent } from './admin-components/delete/delete.component';
import { SaveComponent } from './admin-components/save/save.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './../../model/employee';
import { EmployeeService } from './../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AddComponent } from './admin-components/add/add.component';
import { ActivatedRoute } from '@angular/router';

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

  page:number = 1;
  pageLength: number = 5;  // pageSize  -> select
  totalOrder:number = 11;  // collectionSize, the total number of orders

  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getEmployees();
    // this.finalEmployee();
    this.activatedRoute.paramMap.subscribe(
      () =>{
        this.finalEmployee();
      }
    )
  }


  finalEmployee(){
    let result = this.activatedRoute.snapshot.paramMap.has('key');
    if(result){
      this.getEmployeesByContainingKey();
    }else{
      this.getEmployees();
    }
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


  getEmployeesByContainingKey(){
    let keyword = this.activatedRoute.snapshot.paramMap.get('key');

    this.employeeService.getEmployeeByKeySize(keyword).subscribe(data =>{
       this.totalOrder = data
    })
    this.employeeService.getEmployeesByKey(keyword,this.page-1,this.pageLength).subscribe(data =>{
      this.employees = data
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



   doing(){
    this.finalEmployee();
  }

  pageSize(event:Event){
    this.pageLength = +(<HTMLInputElement>event.target).value;
    this.finalEmployee();
  }


}
