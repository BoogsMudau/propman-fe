import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Example methods
  getClient() {
    return this.supabase;
  }

  async uploadImage(bucket: string, filePath: string, file: File) {
    return await this.supabase.storage.from(bucket).upload(filePath, file);
  }

  async insert(table: string, values: any) {
    return await this.supabase.from(table).insert(values).select();
  }

  async getAll(table: string) {
    return await this.supabase.from(table).select('*');
  }

  async getUser() {
    return this.supabase.auth.getUser();
  }
}
