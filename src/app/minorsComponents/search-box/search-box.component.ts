import { Component, OnInit } from '@angular/core';
import { TshirtService } from 'src/app/services/tshirt.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  param: String;
  allWords;

  constructor(public tshirtService: TshirtService) { }

  ngOnInit() {
  }

  onSearch() {
    this.tshirtService.resetTshirts();
    let allWrd = '';
    if (this.allWords) {
      allWrd = 'on';
    }
    this.tshirtService.searchTshirts(this.param, allWrd);
    // this.beerService.searchBeers(this.param);
  }

}
