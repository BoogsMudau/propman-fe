import { Component, Input } from '@angular/core';
import { MaintenanceLog } from '../../state/maintenance-logs/maintenance-logs.model';
import { formatTimestamp } from '../../services/format-time.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance-log-card',
  imports: [CommonModule],
  templateUrl: './maintenance-log-card.html',
  styleUrl: './maintenance-log-card.scss',
})
export class MaintenanceLogCard {
  @Input() maintenanceLog!: MaintenanceLog;

  formatTimestamp(timestamp: string | Date) {
    return formatTimestamp(timestamp);
  }
}
