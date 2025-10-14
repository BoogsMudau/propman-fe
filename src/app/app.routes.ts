import { Routes } from '@angular/router';
import { Tabs } from './components/tabs/tabs';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';

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
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/maintenance/maintenance').then((m) => m.Maintenance),
      },
      {
        path: 'info',
        loadComponent: () => import('./features/info/info').then((m) => m.Info),
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/create-update/create-update').then((m) => m.CreateUpdate),
      },
      {
        path: 'resolve',
        canActivate: [AdminGuard],
        loadComponent: () =>
          import('./features/resolve-issues/resolve-issues').then((m) => m.ResolveIssues),
      },
      {
        path: 'maintenance-log',
        canActivate: [AuthGuard],
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
    path: 'register',
    loadComponent: () => import('./features/register/register').then((m) => m.Register),
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
