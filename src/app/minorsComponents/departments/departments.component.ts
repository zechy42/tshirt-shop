import { Component, OnInit } from '@angular/core';
import { TshirtService } from 'src/app/services/tshirt.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments = [];

  constructor(public tshirtService: TshirtService) { }

  ngOnInit() {
    this.tshirtService.getDepartments().subscribe((departments: any[]) => {
      this.departments = departments;
      this.tshirtService.depName = departments[0].name;
      // pass the data over to the component who is ovserving
    });
  }

  getInDep(department) {
    this.tshirtService.resetTshirts();
    this.tshirtService.getInDepartment(department.department_id);
    this.tshirtService.getCategories(department.department_id);
    return false;
  }

}
