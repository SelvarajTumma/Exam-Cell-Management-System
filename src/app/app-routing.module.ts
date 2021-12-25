import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { GenerateHallticketComponent } from './generate-hallticket/generate-hallticket.component';
import { MarksComponent } from './marks/marks.component';
import { PayFeeComponent } from './pay-fee/pay-fee.component';
import { AuthService } from './auth.service';
import { TimetableComponent } from './timetable/timetable.component';
const routes: Routes = [
  {path:"",pathMatch:"full",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"user",component:UserViewComponent,children:[
    {path:"StudInfo",component:StudentInfoComponent},
    {path:"GHticket",component:GenerateHallticketComponent},
    {path:"Marks",component:MarksComponent},
    {path:"payFee",component:PayFeeComponent},
    { path: '', component:StudentInfoComponent, pathMatch: 'full'}
  ],canActivate:[AuthService]},
  {path:"Admin",component:AdminViewComponent,children:[
    {path:"",component:TimetableComponent,pathMatch:"full"},
    {path:"Home",component:TimetableComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
