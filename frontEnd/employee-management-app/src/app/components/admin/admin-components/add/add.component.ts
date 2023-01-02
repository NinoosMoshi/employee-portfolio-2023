import { EmployeeService } from './../../../../services/employee.service';
import { Employee } from './../../../../model/employee';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Input() employee:Employee = new Employee;
  @Output() saveEmit = new EventEmitter();

  constructor(private employeeService:EmployeeService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }


  saveEmployee(){
    this.spinner.show();
    this.employeeService.saveNewEmployee(this.employee).subscribe({
      next:data =>{
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

        this.toastr.success('Success', 'You Save' + data.firstName + 'Successfully', {timeOut: 2000});

        this.saveEmit.emit(data);
        $('#EmployeeAddModal').modal('hide');
      },
      error:err =>{
        console.log(err)
        this.toastr.error('Error', 'You Could Not Save Employee', {timeOut: 3000})
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

      }
    })
  }


  showAddModal(){
    $('#EmployeeAddModal').modal('show');
  }




}
