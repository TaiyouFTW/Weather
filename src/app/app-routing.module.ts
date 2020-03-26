import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];
const routes: Routes = [
// { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
// { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
