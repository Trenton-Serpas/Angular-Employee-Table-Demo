import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
