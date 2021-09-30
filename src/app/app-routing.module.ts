import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
const routes: Routes = [
  {path:"",pathMatch:"full",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"user",component:UserViewComponent},
  {path:"admin",component:AdminViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
