import { Component, Input } from '@angular/core';
import { MaintenanceLog } from '../../state/maintenance-logs/maintenance-logs.model';
import { formatTimestamp } from '../../services/format-time.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-log-card',
  imports: [CommonModule],
  templateUrl: './maintenance-log-card.html',
  styleUrl: './maintenance-log-card.scss',
})
export class MaintenanceLogCard {
  @Input() maintenanceLog!: MaintenanceLog;
  constructor(private router: Router) {}
  formatTimestamp(timestamp: string | Date) {
    return formatTimestamp(timestamp);
  }

  handleIssue() {
    this.router.navigate(['tabs', 'resolve'], { state: { maintenanceLog: this.maintenanceLog } });
  }
}
