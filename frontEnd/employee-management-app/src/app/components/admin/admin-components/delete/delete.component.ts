import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Output() confirmed = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  deleteEmployee(){
    this.confirmed.emit();
    $('#EmployeeDeleteModal').modal('hide');
  }

  showDeleteModal(){
    $('#EmployeeDeleteModal').modal('show');
  }



}
