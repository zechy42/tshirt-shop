import { CartService } from './../../services/cart.service';
import { AttribValues } from './../../models/attribValues.model';
import { TshirtService } from './../../services/tshirt.service';
import { Tshirt } from './../../models/tshirt.model';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tshirt-list',
  templateUrl: './tshirt-list.component.html',
  styleUrls: ['./tshirt-list.component.css']
})
export class TshirtListComponent implements OnInit {

  tshirts: Tshirt[]  = [];
  tshirtCount: number;
  pages: number[] = [];
  attribValues: AttribValues[] = [];
  private tshirtSub: Subscription;
  private countSub: Subscription;
  public tshirtForDetail: Tshirt;
  tShirtLoaded = false;
  loadingError = false;
  page = 1;

  constructor(public tshirtService: TshirtService, public cartService: CartService) {}

  ngOnInit() {
    this.tshirtSub = this.tshirtService.getTshirtUpdateListener().subscribe((tshirts: Tshirt[]) => {
      this.tshirts = tshirts;
      // console.log(products);
    });

    this.countSub = this.tshirtService.getCountUpdateListener().subscribe((count: number) => {
      this.tshirtCount = count;
      this.pages = [];
      const perPage = this.tshirtService.perPage;
      const totalPages = Math.ceil( count / perPage );
      for (let i = 1; i <= totalPages; i++) {
        this.pages [i - 1] = i;
      }
    });

    this.tshirtService.getTshirts();

    this.tshirtService.getAttribValues().subscribe((attribs: AttribValues[]) => {
      this.attribValues = attribs;
      // pass the data over to the component who is ovserving
    });
  }

  addToCart(tshirt: Tshirt, detail = false) {
    // alert(JSON.stringify(tshirt));
    let attributes = '';
    let value = '';
    for (let i = 0; i < this.attribValues.length; i++) {
      if (detail) {
        value = $('#detail' + this.attribValues[i].attribute_id + ' option:selected').text();
      } else {
        value = $('#' + tshirt.product_id + this.attribValues[i].attribute_id + ' option:selected').text();
      }
      attributes += this.attribValues[i].name + ':' + value;
      if ( i + 1 !== this.attribValues.length ) {
        attributes += ', ';
      }
      // alert($('#' + tshirt.product_id + this.attribValues[i].attribute_id + ' option:selected').text());
    }
    this.cartService.addToCart(tshirt, attributes);
  }

  divClick(tshirt: Tshirt) {
    this.tShirtLoaded = false;
    this.loadingError = false;
    this.tshirtForDetail = tshirt;
    $('#detailTrigger').click();
    this.tshirtService.getTshirt(tshirt.product_id).subscribe((loaded: Tshirt) => {
      this.tshirtForDetail = loaded;
      this.tShirtLoaded = true;
    }, error => {
      this.loadingError = true;
    });
  }

  fetchForPage(page) {
    this.page = page;
    this.tshirtService.callLastOnPage(page);
    return false;
  }

  fetchPrv() {
    this.page --;
    this.tshirtService.callLastOnPage(this.page);
    return false;
  }

  fetchNxt() {
    this.page ++;
    this.tshirtService.callLastOnPage(this.page);
    return false;
  }
}
