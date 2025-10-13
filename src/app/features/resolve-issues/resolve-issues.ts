import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-resolve-issues',
  imports: [IonicModule, MaintenanceLogCard, Form],
  templateUrl: './resolve-issues.html',
  styleUrl: './resolve-issues.scss',
})
export class ResolveIssues implements OnInit {
  maintenanceLog: MaintenanceLog = history.state.maintenanceLog;
  selectedTags: string[] = [];
  form: FormGroup;
  statuses = [
    { label: 'pending', value: 'pending' },
    { label: 'progress', value: 'progress' },
    { label: 'completed', value: 'completed' },
  ];

  fields: FormField[] = [
    { name: 'status', label: 'Status', type: 'select', options: this.statuses },
  ] as FormField[];

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
    this.form = this.fb.group({
      status: [this.maintenanceLog.status],
    });
  }
  ngOnInit(): void {
    this.maintenanceLog = history.state.maintenanceLog;
    console.log(this.maintenanceLog);
  }

  async onSubmit() {
    console.log(this.form.value.status);
    const { error, data } = await this.supabase
      .getClient()
      .from('maintenance')
      .update({ status: this.form.value.status })
      .eq('id', this.maintenanceLog.id);
    console.log(error, data);
  }
}
