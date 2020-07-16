import { CartService } from './services/cart.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { PublicHeaderComponent } from './header/public-header/public-header.component';
import { MainHeaderComponent } from './header/main-header/main-header.component';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatTabsModule, MatChipsModule,
  MatTableModule,
  MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { UserHomeComponent } from './customers/user-home/user-home.component';
import { SearchBoxComponent } from './minorsComponents/search-box/search-box.component';
import { DepartmentsComponent } from './minorsComponents/departments/departments.component';
import { CategoriesComponent } from './minorsComponents/categories/categories.component';
import { CartSummaryComponent } from './minorsComponents/cart-summary/cart-summary.component';
import { TshirtListComponent } from './customers/tshirt-list/tshirt-list.component';
import { TshirtService } from './services/tshirt.service';
import { DescriptionComponent } from './minorsComponents/description/description.component';
import { ViewCartComponent } from './customers/view-cart/view-cart.component';
import { MyProfileComponent } from './customers/my-profile/my-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicHeaderComponent,
    MainHeaderComponent,
    UserHomeComponent,
    SearchBoxComponent,
    DepartmentsComponent,
    CategoriesComponent,
    CartSummaryComponent,
    TshirtListComponent,
    DescriptionComponent,
    ViewCartComponent,
    MyProfileComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatTableModule, MatSelectModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatTabsModule,
    MatChipsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService, TshirtService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
