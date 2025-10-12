import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SupabaseService } from '../../services/supabase.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private supabase: SupabaseService) {}
  getUser() {
    return from(this.supabase.getClient().auth.getUser()).pipe(
      map((response) => {
        if (response.error || !response.data.user) {
          throw response.error || new Error('No user found');
        }

        const user: User = {
          id: response.data.user.id,
          email: response.data.user.email!,
          name: response.data.user.user_metadata['fullName'],
          role: response.data.user.user_metadata['role'],
        };

        return user;
      })
    );
  }
}
