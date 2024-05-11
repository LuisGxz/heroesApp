import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './modules/shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { PublicGuard } from './modules/auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=> import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard],
    canMatch: [PublicGuard]
  },
  {
    path: 'heroes',
    loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path  : '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
