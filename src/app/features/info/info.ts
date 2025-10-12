import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {
  constructor(private supabase: SupabaseService, private router: Router) {}
  async logOut() {
    const { error } = await this.supabase.getClient().auth.signOut();
    this.router.navigate(['/login']);
  }
}
