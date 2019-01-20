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
import { AuthGuard } from '../core/auth.guard';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { HistoricalTracksComponent } from '../components/historical-tracks/historical-tracks.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'employers', component: EmployersComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'trucks', component: TrucksComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'historicalTracks', component: HistoricalTracksComponent, canActivate: [AuthGuard]},
  { path: 'resetPassword', component: ResetPasswordComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
