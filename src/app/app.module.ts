import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateLoginDetailsComponent } from './update-login-details/update-login-details.component';
import{MatIconModule, MatSidenavModule,MatListModule} from '@angular/material';
import { StudentInfoComponent } from './student-info/student-info.component';
import { GenerateHallticketComponent } from './generate-hallticket/generate-hallticket.component';
import { PayFeeComponent } from './pay-fee/pay-fee.component';
import { MarksComponent } from './marks/marks.component';
import { TimetableComponent } from './timetable/timetable.component';
import {MatSelectModule,MatOptionModule,MatFormFieldModule} from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditTimetableComponent } from './edit-timetable/edit-timetable.component';
import { PaidListComponent } from './paid-list/paid-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserViewComponent,
    AdminViewComponent,
    UpdateLoginDetailsComponent,
    StudentInfoComponent,
    GenerateHallticketComponent,
    PayFeeComponent,
    MarksComponent,
    TimetableComponent,
    EditTimetableComponent,
    PaidListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,    
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,    
    MatOptionModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
