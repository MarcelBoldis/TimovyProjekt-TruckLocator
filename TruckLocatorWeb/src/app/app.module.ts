import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { EmployersComponent } from './components/employers/employers.component';
import { TrucksComponent } from './components/trucks/trucks.component';
import { MaterialModule } from './material/material.module';
import { MapComponent } from './components/home/map/map.component';
import { EmployeeListComponent } from './components/home/employee-list/employee-list.component';
import { EmployeeListDetailDialogComponent } from './dialogs/employee-list-detail-dialog/employee-list-detail-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeInfoComponent } from './dialogs/employee-info/employee-info.component';
import { TruckDetailComponent } from './components/trucks/truck-detail/truck-detail.component';
import { NewTruckComponent } from './dialogs/new-truck/new-truck.component';
import { NewEmployeeComponent } from './dialogs/new-employee/new-employee.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NewTaskComponent } from './components/tasks/new-task/new-task.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatDialogComponent } from './dialogs/chat-dialog/chat-dialog.component';
import { AuthGuard } from './core/auth.guard';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TasksComponent,
    EmployersComponent,
    TrucksComponent,
    MapComponent,
    EmployeeListComponent,
    EmployeeListDetailDialogComponent,
    LoginComponent,
    RegistrationComponent,
    EmployeeDetailComponent,
    EmployeeInfoComponent,
    TruckDetailComponent,
    NewTruckComponent,
    NewEmployeeComponent,
    StatisticsComponent,
    NewTaskComponent,
    ChatComponent,
    ChatDialogComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2ImgMaxModule,
    AngularWebStorageModule
  ],
  providers: [AuthGuard],
  entryComponents: [EmployeeListDetailDialogComponent, EmployeeInfoComponent, NewTruckComponent, NewEmployeeComponent, ChatDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
