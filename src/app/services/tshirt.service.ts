import { AttribValues } from './../models/attribValues.model';
import { Tshirt } from './../models/tshirt.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TshirtService {
  uri = 'http://localhost:3000';
  private tshirts: Tshirt[] = [];
  private categories: any[] = [];
  private productCount = 1;

  private tshirtsUpdated = new Subject<Tshirt[]>();
  private categoryUpdated = new Subject<any[]>();
  private countUpated = new Subject<number>();
  private descriptionChanged = new Subject<any>();
  private description = {};
  public page = 1;
  public perPage = 12;
  private fetchingTshirt = false;
  private from = '';

  private lastParams: any[] = [];

  public depName;

  constructor(private http: HttpClient, private userService: UserService) {
    this.lastParams['depId'] = 1;
  }

  resetTshirts() {
    this.page = 1;
    this.tshirts = [];
  }

  getTshirts() {
    if (!this.fetchingTshirt) {
      this.from = 'get';
      this.fetchingTshirt = true;
      console.log('page: ' + this.page);
      this.http.get<Tshirt[]>(`${this.uri}/products?page=${this.page}&perPage=${this.perPage}`).subscribe((response: any[]) => {
        this.fetchingTshirt = false;
        this.tshirts = response[1];
        this.productCount = response[0].product_count;
        this.tshirtsUpdated.next([...this.tshirts]);
        this.countUpated.next(this.productCount);
      }, error => {
        this.fetchingTshirt = false;
        console.log('Error while fetching tshirts');
        console.log(error);
        this.page--;
      });
    }
  }

  getTshirt(id) {
    return this.http.get<Tshirt>(`${this.uri}/products/${id}`);
  }

  getInDepartment(depId) {
    this.lastParams['depId'] = depId;
    if (!this.fetchingTshirt) {
      this.from = 'dep';
      this.fetchingTshirt = true;
      console.log('page: ' + this.page);
      this.getDescriptionDep(depId);
      const url = `${this.uri}/products/inDepartment/${depId}?page=${this.page}&perPage=${this.perPage}`;
      this.http.get<Tshirt[]>(url).subscribe((response: any[]) => {
        this.fetchingTshirt = false;
        this.tshirts = response[1];
        this.productCount = response[0].product_count;
        this.tshirtsUpdated.next([...this.tshirts]);
        this.countUpated.next(this.productCount);
      }, error => {
        this.fetchingTshirt = false;
        console.log('Error while fetching tshirts');
        console.log(error);
        this.page--;
      });
    }
  }

  getInCategory(catId) {
    this.lastParams['catId'] = catId;
    if (!this.fetchingTshirt) {
      this.from = 'cat';
      this.fetchingTshirt = true;
      console.log('page: ' + this.page);
      this.getDescriptionCat(catId);
      const url = `${this.uri}/products/inCategory/${catId}?page=${this.page}&perPage=${this.perPage}`;
      this.http.get<Tshirt[]>(url).subscribe((response: any[]) => {
        this.fetchingTshirt = false;
        this.tshirts = response[1];
        this.productCount = response[0].product_count;
        this.tshirtsUpdated.next([...this.tshirts]);
        this.countUpated.next(this.productCount);
      }, error => {
        this.fetchingTshirt = false;
        console.log('Error while fetching tshirts');
        console.log(error);
        this.page--;
      });
    }
  }

  searchTshirts(param: String, allWords: String) {
    this.lastParams['param'] = param;
    this.lastParams['allWords'] = allWords;
    if (!this.fetchingTshirt) {
      this.from = 'search';
      this.fetchingTshirt = true;
      const reqBody = {
        param: param,
        allWords: allWords
      };
      this.getDescriptionSearch(param);
      const url = `${this.uri}/products/search?page=${this.page}&perPage=${this.perPage}`;
      this.http.post<Tshirt[]>(url, reqBody).subscribe((response: any[]) => {
        this.fetchingTshirt = false;
        this.tshirts = response[1];
        this.productCount = response[0].product_count;
        this.tshirtsUpdated.next([...this.tshirts]);
        this.countUpated.next(this.productCount);
      }, error => {
        this.fetchingTshirt = false;
        console.log('Error while fetching tshirts');
        console.log(error);
        this.page--;
      });
    }
  }

  getDescriptionDep(depId) {
    const url = `${this.uri}/departments`;
    this.http.get<any[]>(url).subscribe((response: any[]) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].department_id === depId) {
          const title = response[i].name;
          this.depName = response[i].name;
          const description = response[i].description;
          this.description = {
            title: title,
            description: description
          };
          this.descriptionChanged.next(this.description);
        }
      }
    });
  }

  getDescriptionCat(catId) {
    const depId = this.lastParams['depId'];
    const url = `${this.uri}/departments/categories/${depId}`;
    this.http.get<any[]>(url).subscribe((response: any[]) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].category_id === catId) {
          const title = response[i].name;
          const description = response[i].description;
          this.description = {
            title: this.depName + ' >> ' + title,
            description: description
          };
          this.descriptionChanged.next(this.description);
        }
      }
    });
  }

  getDescriptionSearch(param) {
    const title = 'Search Result';
    const description = 'Products Containing \'' + param + '\'';
    this.description = {
      title: title,
      description: description
    };
    this.descriptionChanged.next(this.description);
  }

  callLastOnPage(page) {
    // alert(this.from + ' page: ' + page);
    this.page = page;
    if ( this.from === 'get' ) {
      this.getTshirts();
    } else if (this.from === 'dep') {
      this.getInDepartment(this.lastParams['depId']);
    } else if (this.from === 'cat') {
      this.getInCategory(this.lastParams['catId']);
    } else if (this.from === 'search') {
      this.searchTshirts(this.lastParams['param'], this.lastParams['allWords']);
    }
  }

  getAttribValues() {
    return this.http.get<AttribValues[]>(`${this.uri}/attributes/full`);
  }

  getDepartments() {
    return this.http.get<any>(`${this.uri}/departments`);
  }

  getCategories(depId) {
    const url = `${this.uri}/departments/categories/${depId}`;
      this.http.get<any[]>(url).subscribe((categories: any[]) => {
        this.categories = categories;
        this.categoryUpdated.next([...this.categories]);
      });
  }

  getTshirtUpdateListener() {
    return this.tshirtsUpdated.asObservable();
  }
  getCategoryUpdateListener() {
    return this.categoryUpdated.asObservable();
  }
  getCountUpdateListener() {
    return this.countUpated.asObservable();
  }
  getDescriptionChangedListener() {
    return this.descriptionChanged.asObservable();
  }
}
