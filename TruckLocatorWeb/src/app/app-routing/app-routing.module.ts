import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { EmployersComponent } from '../components/employers/employers.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { TrucksComponent } from '../components/trucks/trucks.component';
import { LoginComponent } from '../components/login/login.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import {StatisticsComponent} from '../components/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employers', component: EmployersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'trucks', component: TrucksComponent },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
