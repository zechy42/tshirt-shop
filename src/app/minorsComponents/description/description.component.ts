import { Subscription } from 'rxjs';
import { TshirtService } from './../../services/tshirt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  private desSub: Subscription;

  description = {
    title: '',
    description: ''
  };

  constructor(public tshirtService: TshirtService) { }

  ngOnInit() {
    this.desSub = this.tshirtService.getDescriptionChangedListener().subscribe((description: any) => {
      this.description = description;
      // console.log(products);
    });
  }

}
