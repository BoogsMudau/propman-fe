import { Component, inject, OnInit } from '@angular/core';
import { MaintenanceLog } from '../../state/maintenance-logs/maintenance-logs.model';
import { IonicModule } from '@ionic/angular';
import { MaintenanceLogCard } from '../../components/maintenance-log-card/maintenance-log-card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Form, FormField } from '../../components/form/form';
import { SupabaseService } from '../../services/supabase.service';
import { UpdateCard } from '../../components/update-card/update-card';
import { Store } from '@ngrx/store';
import { hideLoader, showLoader } from '../../state/loader/loader.action';

@Component({
  selector: 'app-resolve-issues',
  imports: [IonicModule, UpdateCard, Form],
  templateUrl: './resolve-issues.html',
  styleUrl: './resolve-issues.scss',
})
export class ResolveIssues implements OnInit {
  maintenanceLog: MaintenanceLog = history.state.maintenanceLog;
  selectedTags: string[] = [];
  form: FormGroup;
  store = inject(Store);
  statuses = [
    { label: 'pending', value: 'pending' },
    { label: 'progress', value: 'progress' },
    { label: 'completed', value: 'completed' },
  ];

  fields: FormField[] = [
    { name: 'status', label: 'Status', type: 'select', options: this.statuses },
    { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Update notes' },
  ] as FormField[];

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
    this.form = this.fb.group({
      status: [this.maintenanceLog.status],
      notes: [this.maintenanceLog.notes],
    });
  }
  ngOnInit(): void {
    this.maintenanceLog = history.state.maintenanceLog;
  }

  async onSubmit() {
    try {
      this.store.dispatch(showLoader());
      const { error, data } = await this.supabase
        .getClient()
        .from('maintenance')
        .update({ status: this.form.value.status, notes: this.form.value.notes })
        .eq('id', this.maintenanceLog.id);
    } catch (error) {
      console.log(error);
    } finally {
      this.store.dispatch(hideLoader());
      history.back();
    }
  }
}
