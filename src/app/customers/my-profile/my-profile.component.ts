import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private userSub: Subscription;
  public regions = [];
  public selected;
  public user: User = {
    customer_id: 0,
    name: 'ad',
    email: '',
    password: '',
    credit_card: '',
    address_1: '',
    address_2: '',
    city: '',
    region: '',
    postal_code: '',
    country: '',
    shipping_region_id: 0,
    day_phone: 0,
    eve_phone: 0,
    mob_phone: 0
  };

  constructor(public userService: UserService) {
    this.regions[0] = {
      shipping_region_id: 1,
      shipping_region: 'Please Select'
    };
  }

  ngOnInit() {
    this.userSub = this.userService.getUserUpdateListener().subscribe((user: User) => {
      this.user = user;
      this.selected = user.shipping_region_id;
      // console.log(products);
    });
    this.userService.getRegions().subscribe((regions: any[]) => {
      this.regions = regions;
    });

    this.userService.getUserData();
  }

  changeAccount() {
    if (!this.user.password) {
      this.user.password = '';
    }
    // tslint:disable-next-line:max-line-length
    this.userService.setAccount(this.user.name, this.user.email, this.user.password, this.user.day_phone, this.user.eve_phone, this.user.mob_phone);
    // alert(name + email + password + dayPhone + evePhone + mobPhone);
  }

  changeAddress() {
    if (this.selected === 1) {
      alert ('Please Select a Region');
      return;
    }
    let region = '';
    this.selected = parseInt(this.selected, 10);
    for (let i = 0; i < this.regions.length; i++) {
      if (this.regions[i].shipping_region_id === this.selected) {
        region = this.regions[i].shipping_region;
      }
    }
    // tslint:disable-next-line:max-line-length
    this.userService.setAddress(this.user.address_1, this.user.address_2, this.user.postal_code, this.user.city, this.user.country, region, this.selected);
    // alert(this.user.address_1 + this.user.address_2 + this.user.postal_code + this.user.city + this.user.country + this.selected);
  }

  saveCreditCard() {
    if (this.user.credit_card.indexOf('*') < 0) {
      this.userService.setCreditCard(this.user.credit_card);
    }
  }

}
