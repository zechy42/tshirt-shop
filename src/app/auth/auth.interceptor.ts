import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('noauth')) {
      return next.handle(req);
    } else {
      const token = this.userService.getToken();
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', token)
        });
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    }
  }
}
