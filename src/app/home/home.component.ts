import { User } from './../models/user.model';
import { TokenModel } from './../models/token.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(email, password) {
    this.userService.login(email, password).subscribe(
      (incomingToken: TokenModel) => {
        this.userService.setToken(incomingToken.token);
        this.router.navigateByUrl('/userHome');
      },
      err => {
        $('#authDiv').html('Authentication failed, Try again.');
      }
    );
  }

  onSignUp(username, email, password) {
    this.userService.signUp(username, email, password).subscribe(
      (user: User) => {
        this.onLogin(email, password);
      },
      err => {
        $('#failedDiv').html('Sign-up failed, please try again, this might occur if the email address is already used to sign-up');
      }
    );
  }

}
