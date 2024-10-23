import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Ensure the correct path

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/welcome/sign-in/sign-in.module').then(m => m.SignInPageModule) // Ensure this path is correct
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard] // Protect the tabs route with AuthGuard
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/tabs/booking/booking.module').then(m => m.BookingPageModule) // Ensure this path is correct
  },
  {
    path: '**',
    redirectTo: 'welcome' // Redirect unknown paths to the welcome page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
