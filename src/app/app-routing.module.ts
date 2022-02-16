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
import { EditTimetableComponent } from './edit-timetable/edit-timetable.component';
import { PaidListComponent } from './paid-list/paid-list.component';
import { SetMarksComponent } from './set-marks/set-marks.component';
import { EditMarksComponent } from './edit-marks/edit-marks.component';
const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"login"},
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
    {path:"Set-Timetable",component:TimetableComponent},
    {
      path:"Edit-Timetable",component:EditTimetableComponent
    },
    {
      path:"paidList",component:PaidListComponent
    }
    ,{
      path:"setMarks",component:SetMarksComponent
    },
    {
      path:"EditMarks",component:EditMarksComponent
    }
  ],canActivate:[AuthService]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
