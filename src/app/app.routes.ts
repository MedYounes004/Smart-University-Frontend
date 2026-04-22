import { Routes } from '@angular/router';

export const routes: Routes = [
  {
<<<<<<< HEAD
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/Courses/courses.page').then((m) => m.CoursesPage),
  },
  {
=======
>>>>>>> fe5ab535c2a5413bd54c1be322f1cdd9844cf4a7
    path: '',
    redirectTo: 'ai-assisstant',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'ai-assisstant',
    loadComponent: () => import('./pages/ai-assisstant/ai-assisstant.page').then( m => m.AiAssisstantPage)
  },

 
];