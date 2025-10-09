import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MaintenanceLog } from './maintenance-logs.model';

@Injectable({ providedIn: 'root' })
export class MaintenanceLogsService {
  getMaintenanceLogs() {
    const mockMaintenanceLogs: MaintenanceLog[] = [
      {
        id: 1,
        name: 'Maintenance Log 1',
        description: 'Description 1',
        date: '2022-01-01',
        status: 'Pending',
        image: 'https://via.placeholder.com/150',
        updatedAt: '2022-01-01T00:00:00.000Z',
        message: 'Message 1',
      },
      {
        id: 1,
        name: 'Maintenance Log 1',
        description: 'Description 1',
        date: '2022-01-01',
        status: 'Pending',
        image: 'https://via.placeholder.com/150',
        updatedAt: '2022-01-01T00:00:00.000Z',
        message: 'Message 1',
      },
    ];
    return of(mockMaintenanceLogs).pipe(delay(1000));
  }
}
