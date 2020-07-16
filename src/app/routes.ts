import { MyProfileComponent } from './customers/my-profile/my-profile.component';
import { ViewCartComponent } from './customers/view-cart/view-cart.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { UserHomeComponent } from './customers/user-home/user-home.component';

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'userHome', component: UserHomeComponent, canActivate: [AuthGuard]},
  {path: 'myProfile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'viewCart', component: ViewCartComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
