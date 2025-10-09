import { Component, inject, OnInit } from '@angular/core';
import {
  selectMaintenanceLogs,
  selectLoading,
} from '../../state/maintenance-logs/maintenance-logs.selector';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { loadMaintenanceLogs } from '../../state/maintenance-logs/maintenance-logs.action';
import { CommonModule } from '@angular/common';
import { MaintenanceLogCard } from '../../components/maintenance-log-card/maintenance-log-card';

@Component({
  selector: 'app-maintenance',
  imports: [CommonModule, MaintenanceLogCard],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.scss',
})
export class Maintenance implements OnInit {
  private store = inject(Store);

  maintenanceLogs$ = this.store.select(selectMaintenanceLogs);
  loading$ = this.store.select(selectLoading);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadMaintenanceLogs());
  }

  logMaintenance() {
    this.router.navigate(['tabs', 'maintenance-log']);
  }
}
