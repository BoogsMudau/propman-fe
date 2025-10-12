import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommunityUpdate } from './community-update.model';
import { SupabaseService } from '../../services/supabase.service';
import { PostgrestResponse } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class CommunityUpdatesService {
  constructor(private supabase: SupabaseService) {}
  getUpdates() {
    return from(this.supabase.getAll('updates')).pipe(
      map((response: PostgrestResponse<CommunityUpdate>) => {
        if (response.error) {
          throw response.error;
        }
        return response.data || [];
      })
    );
  }

  createUpdate(update: CommunityUpdate) {
    return from(this.supabase.insert('updates', update)).pipe(
      map((response: PostgrestResponse<CommunityUpdate>) => {
        if (response.error) {
          throw response.error;
        }
        return response.data?.[0] as CommunityUpdate;
      })
    );
  }
}
