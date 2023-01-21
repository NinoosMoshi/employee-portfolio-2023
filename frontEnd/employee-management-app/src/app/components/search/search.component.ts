import { Router } from '@angular/router';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  constructor(private employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
  }


  doSearch(key:string){
    this.router.navigateByUrl(`/admin/${key}`);
  }

}
