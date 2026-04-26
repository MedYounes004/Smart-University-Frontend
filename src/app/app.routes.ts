import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/courses.page').then((m) => m.CoursesPage),
  },
  {
    path: 'ai-assisstant',
    loadComponent: () =>
      import('./pages/ai-assisstant/ai-assisstant.page').then(
        (m) => m.AiAssisstantPage,
      ),
  },
  {
    path: 'campus',
    loadComponent: () =>
      import('./pages/campus/campus.page').then((m) => m.CampusPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
];
