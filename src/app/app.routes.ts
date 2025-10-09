import { Routes } from '@angular/router';
import { Tabs } from './components/tabs/tabs';

export const routes: Routes = [
  {
    path: 'tabs',
    component: Tabs,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'maintenance',
        loadComponent: () =>
          import('./features/maintenance/maintenance').then((m) => m.Maintenance),
      },
      {
        path: 'info',
        loadComponent: () => import('./features/info/info').then((m) => m.Info),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/create-update/create-update').then((m) => m.CreateUpdate),
      },
      {
        path: 'maintenance-log',
        loadComponent: () =>
          import('./features/maintenance-log/maintenance-log').then((m) => m.MaintenanceLog),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
