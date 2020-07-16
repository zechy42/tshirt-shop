import { TokenModel } from './../models/token.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:3000';
  token: TokenModel;
  user: User;

  private userUpdated = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) { }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  login(email: string, password: string) {
    // WE NEED TO HANDLE ERRORS HERE
    const user = {email: email, password: password};
    // this.
    return this.http.post<TokenModel>(`${this.uri}/customer/login`, user);
  }

  signUp(username: string, email: string, password: string) {
    // WE NEED TO HANDLE ERRORS HERE
    const user = {username: username, email: email, password: password};
    // this.
    return this.http.post<User>(`${this.uri}/customer/signUp`, user);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = localStorage.getItem('token');
    let userPayload = '';
    if (token) {
      userPayload = atob(token.split('.')[1]);
      return (JSON.parse(userPayload));
    } else {
      return null;
    }
  }

  getMyProfile() {
    const token = localStorage.getItem('token');
    let userPayload = '';
    if (token) {
      userPayload = atob(token.split('.')[1]);
      const payload =  JSON.parse(userPayload);
      const userId = payload.id;
      return this.http.get<User>(`${this.uri}/customer/${userId}`);
    } else {
      return null;
    }
  }

  getUserData() {
    const token = localStorage.getItem('token');
    let userPayload = '';
    userPayload = atob(token.split('.')[1]);
    const payload =  JSON.parse(userPayload);
    const userId = payload.id;
    return this.http.get<User>(`${this.uri}/customer/${userId}`).subscribe((response: User) => {
      this.user = response;
      this.userUpdated.next({...this.user});
    }, error => {});
  }

  setAccount(name, email, password, dayPhone, evePhone, mobPhone) {
    const token = localStorage.getItem('token');
    const userPayload = atob(token.split('.')[1]);
    const payload =  JSON.parse(userPayload);
    const userId = payload.id;
    const reqBody =  {
      name: name,
      email: email,
      password: password,
      day_phone: dayPhone,
      eve_phone: evePhone,
      mob_phone: mobPhone
    };
    const url = `${this.uri}/customer/account/${userId}`;
    this.http.put<User>(url, reqBody).subscribe((response: User) => {
      this.user = response;
      this.userUpdated.next({...this.user});
      alert('saved');
    }, error => {});
  }

  setAddress(address_1, address_2, postal_code, city, country, region_text, region_id) {
    const token = localStorage.getItem('token');
    const userPayload = atob(token.split('.')[1]);
    const payload =  JSON.parse(userPayload);
    const userId = payload.id;
    const reqBody =  {
      address_1: address_1,
      address_2: address_2,
      city: city,
      region: region_text,
      postal_code: postal_code,
      country: country,
      shipping_region_id: region_id
    };

    const url = `${this.uri}/customer/address/${userId}`;
    this.http.put<User>(url, reqBody).subscribe((response: User) => {
      this.user = response;
      this.userUpdated.next({...this.user});
      alert('saved');
    }, error => {});

  }

  setCreditCard(credit_card) {
    const token = localStorage.getItem('token');
    const userPayload = atob(token.split('.')[1]);
    const payload =  JSON.parse(userPayload);
    const userId = payload.id;
    const reqBody =  {
      credit_card: credit_card
    };

    const url = `${this.uri}/customer/creditCard/${userId}`;
    this.http.put<User>(url, reqBody).subscribe((response: User) => {
      this.user = response;
      this.userUpdated.next({...this.user});
      alert('saved');
    }, error => {});

  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  getRegions() {
    return this.http.get<any>(`${this.uri}/cart/regions`);
  }


}







