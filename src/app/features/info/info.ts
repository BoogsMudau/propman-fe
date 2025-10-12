import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logOut } from '../../state/user/user.action';

@Component({
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {
  store = inject(Store);
  constructor(private supabase: SupabaseService, private router: Router) {}
  async logOut() {
    const { error } = await this.supabase.getClient().auth.signOut();
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }
}
