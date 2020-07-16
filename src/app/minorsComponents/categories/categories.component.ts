import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TshirtService } from 'src/app/services/tshirt.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private catSub: Subscription;

  categories = [];

  constructor(public tshirtService: TshirtService) { }

  ngOnInit() {
    this.catSub = this.tshirtService.getCategoryUpdateListener().subscribe((categories: any[]) => {
      this.categories = categories;
      // console.log(products);
    });
    this.tshirtService.getCategories(1);
  }

  getInCategory(category) {
    this.tshirtService.resetTshirts();
    this.tshirtService.getInCategory(category.category_id);
    return false;
  }


}
