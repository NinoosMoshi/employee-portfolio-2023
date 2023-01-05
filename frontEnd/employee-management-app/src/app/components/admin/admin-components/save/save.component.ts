import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

declare var $:any;

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  @Input() employee:Employee = new Employee;
  @Output() save = new EventEmitter<any>();

  constructor(private employeeService:EmployeeService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }


  saveEmployee(){
    this.spinner.show();
    this.employeeService.saveNewEmployee(this.employee).subscribe({
      next:data =>{
         this.save.emit(data);

        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.toastr.success('Success', 'You Save' + data.firstName + 'Successfully', {timeOut: 2000});
        $('#EmployeeSaveModal').modal('hide');
      },
      error:err =>{
        this.toastr.error('Error', 'You Could Not Save Employee', {timeOut: 2000})
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);

      }
    })
  }





  showEmployeeModal(){
    $('#EmployeeSaveModal').modal('show');
  }




}
