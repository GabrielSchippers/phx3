import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'ng2-owl-carousel';
import {NgsRevealModule} from 'ng-scrollreveal';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {ShareButtonsModule} from 'ngx-sharebuttons';

import { CookieModule } from 'ngx-cookie';
 
import { AuthGuard } from './auth-guard';
 
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { CartService } from './cart.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { OrdersComponent } from './orders/orders.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './products/products.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultyPageComponent } from './faculty-page/faculty-page.component';
import { BlogComponent } from './blog/blog.component';
import { ResourcesComponent } from './resources/resources.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SignupComponent } from './signup/signup.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { PostsComponent } from './posts/posts.component';
import { AdminResourcesComponent } from './admin-resources/admin-resources.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { Course2EditComponent } from './course2-edit/course-edit.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { ResourcesShiftComponent } from './resources-shift/resources-shift.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoaderComponent } from './loader/loader.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminFacultyComponent } from './admin-faculty/admin-faculty.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { FacultyEditComponent } from './faculty-edit/faculty-edit.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  
  { path: 'pages', component: PagesComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'faculty/:id', component: FacultyPageComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  
  
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirm', component: ConfirmComponent },
  
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  
  { path: 'classes', component: MyClassesComponent, canActivate: [AuthGuard] },
  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/accounts/detail', component: AccountDetailComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/accounts/detail/:id', component: AccountDetailComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/accounts/create', component: CreateUserComponent, canActivate: [AuthGuard] },
  
  { path: 'dashboard/posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/posts/create', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/posts/detail/:id', component: PostEditComponent, canActivate: [AuthGuard] },
  
  { path: 'dashboard/resources', component: AdminResourcesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/resources/create', component: ResourceEditComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/resources/detail/:id', component: ResourceEditComponent, canActivate: [AuthGuard] },

  { path: 'dashboard/courses', component: AdminCoursesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/courses/create', component: CourseEditComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/courses/detail/:id', component: CourseEditComponent, canActivate: [AuthGuard] },
  
  { path: 'dashboard/products', component: AdminProductsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/products/detail/:id', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/products/create', component: ProductEditComponent, canActivate: [AuthGuard] },
  
  
  { path: 'dashboard/faculty', component: AdminFacultyComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/faculty/create', component: FacultyEditComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/faculty/detail/:id', component: FacultyEditComponent, canActivate: [AuthGuard] },
  
  { path: 'dashboard/pages', component: AdminPagesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/pages/create', component: PageEditComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/pages/detail/:id', component: PageEditComponent, canActivate: [AuthGuard] },
  
  { path: 'course2', component: Course2EditComponent, canActivate: [AuthGuard] },
  
   { path: 'contact', component: ContactComponent },
];

  
import { CallbackPipe } from './callback.pipe';
import { InstructorTypeComponent } from './instructor-type/instructor-type.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SearchComponent } from './search/search.component';
  
  
  
@NgModule({
  declarations: [
    CallbackPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CoursesComponent,
    OrdersComponent,
    PagesComponent,
    DisclaimerComponent,
    PrivacyComponent,
    TermsComponent,
    ProductsComponent,
    UsersComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    CourseDetailComponent,
    FacultyComponent,
    FacultyPageComponent,
    BlogComponent,
    ResourcesComponent,
    ContactComponent,
    CartComponent,
    ProductDetailComponent,
    SignupComponent,
    AccountsComponent,
    DashboardMenuComponent,
    AccountDetailComponent,
    CreateUserComponent,
    PostsComponent,
    AdminResourcesComponent,
    AdminCoursesComponent,
    AdminProductsComponent,
    ProductEditComponent,
    CourseEditComponent,
    Course2EditComponent,
    ResourceEditComponent,
    PostEditComponent,
    ResourcesShiftComponent,
    UserTypeComponent,
    FileUploadComponent,
    CheckoutComponent,
    ConfirmComponent,
    LoaderComponent,
    MyProfileComponent,
    MyOrdersComponent,
    AdminFacultyComponent,
    AdminPagesComponent,
    FacultyEditComponent,
    PageEditComponent,
    OrdersAdminComponent,
    InstructorTypeComponent,
    MyClassesComponent,
    BlogDetailComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    OwlModule,
    FormsModule,
    HttpModule,
    ShareButtonsModule.forRoot(),
    JsonpModule,
    NgbModule.forRoot(),
    NgsRevealModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    CookieModule.forRoot(),
   
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
            DataService,
            AuthGuard,
            CartService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
