import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ai-screen',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'ai-screen',
    loadComponent: () =>
      import('./pages/ai-screen/ai-screen.page').then((m) => m.AiAssistantComponent),
  },
  

  // Add other tabs as you build them
  // {
  //   path: 'courses',
  //   loadComponent: () => import('./pages/courses/courses.page').then(m => m.CoursesPage),
  // },
  // {
  //   path: 'campus',
  //   loadComponent: () => import('./pages/campus/campus.page').then(m => m.CampusPage),
  // },
  // {
  //   path: 'profile',
  //   loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
  // },
];