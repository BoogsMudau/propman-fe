import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MaintenanceLog } from './maintenance-logs.model';
import { SupabaseService } from '../../services/supabase.service';

@Injectable({ providedIn: 'root' })
export class MaintenanceLogsService {
  constructor(private supabase: SupabaseService) {}
  getMaintenanceLogs(id?: string) {
    const query = this.supabase.getClient().from('maintenance').select('*');
    if (id) {
      query.eq('creatorId', id);
    }
    return from(query).pipe(
      map((response: any) => {
        if (response.error) {
          throw response.error;
        }
        return response.data as MaintenanceLog[];
      })
    );
  }

  createMaintenanceLog(maintenanceLog: MaintenanceLog) {
    return from(this.supabase.insert('maintenance', maintenanceLog)).pipe(
      map((response: any) => {
        if (response.error) {
          throw response.error;
        }
        return response.data?.[0] as MaintenanceLog;
      })
    );
  }
}
