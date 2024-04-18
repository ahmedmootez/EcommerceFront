import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolveService } from './product-resolve.service';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [ { path: 'home', component: HomeComponent },
{ path: 'admin', component: AdminComponent,canActivate:[authGuard], data:{roles:['Admin']} },
{ path: 'user', component: UserComponent ,canActivate:[authGuard], data:{roles:['User']}   },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: RegisterComponent },
{ path: 'forbidden', component: ForbiddenComponent },
{ path: 'addNewProduct', component: AddNewProductComponent ,canActivate:[authGuard], data:{roles:['Admin']},
    resolve:{
      product:ProductResolveService
    }



},
{ path: 'ShowProductDetails', component: ShowProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
