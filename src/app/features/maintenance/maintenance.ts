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
import { IonicModule } from '@ionic/angular';
import { selectUser } from '../../state/user/user.selector';
import { UpdateCard } from '../../components/update-card/update-card';
import { combineLatest, map } from 'rxjs';
import { MaintenanceLog } from '../maintenance-log/maintenance-log';

@Component({
  selector: 'app-maintenance',
  imports: [CommonModule, IonicModule, UpdateCard],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.scss',
})
export class Maintenance implements OnInit {
  private store = inject(Store);

  loading$ = this.store.select(selectLoading);
  user$ = this.store.select(selectUser);
  maintenanceLogs$ = this.store.select(selectMaintenanceLogs);
  myLogs$ = combineLatest([this.maintenanceLogs$, this.user$]).pipe(
    map(([logs, user]) => logs.filter((log) => log.creatorId === user?.id))
  );

  communityLogs$ = combineLatest([this.maintenanceLogs$, this.user$]).pipe(
    map(([logs, user]) => logs.filter((log) => log.creatorId !== user?.id))
  );

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      const id = user?.role === 'admin' ? undefined : user?.id;
      this.store.dispatch(loadMaintenanceLogs({ id }));
    });
  }

  handleCardClick(log: any) {
    this.router.navigate(['tabs', 'resolve'], { state: { maintenanceLog: log } });
  }

  logMaintenance() {
    this.router.navigate(['tabs', 'maintenance-log']);
  }
}
