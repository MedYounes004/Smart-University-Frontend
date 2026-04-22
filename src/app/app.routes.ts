import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ai-assisstant',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/Courses/courses.page').then((m) => m.CoursesPage),
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
];
