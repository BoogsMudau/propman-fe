import { Component, inject, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { createMaintenanceLog } from '../../state/maintenance-logs/maintenance-logs.action';
import { selectUser } from '../../state/user/user.selector';
import { loadUser } from '../../state/user/user.action';
import { Form, FormField } from '../../components/form/form';
import { SupabaseService } from '../../services/supabase.service';
import { hideLoader, showLoader } from '../../state/loader/loader.action';

@Component({
  selector: 'app-maintenance-log',
  imports: [
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    Form,
  ],
  templateUrl: './maintenance-log.html',
  styleUrl: './maintenance-log.scss',
})
export class MaintenanceLog implements OnInit {
  form: FormGroup;

  private store = inject(Store);
  user$ = this.store.select(selectUser);
  priorities = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];

  categories = [
    { label: 'Plumbing', value: 'plumbing' },
    { label: 'Electrical', value: 'electrical' },
    { label: 'Lights', value: 'lights' },
    { label: 'Garden', value: 'garden' },
    { label: 'Gate', value: 'gate' },
    { label: 'Other', value: 'other' },
  ];

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  fields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Short issue title' },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Describe the issue',
    },
    { name: 'unit', label: 'Unit Number', type: 'text', placeholder: 'Unit Number' },
    { name: 'category', label: 'Category', type: 'select', options: this.categories },
    { name: 'priority', label: 'Priority', type: 'select', options: this.priorities },
    { name: 'file', label: 'Attachment', type: 'file' },
  ] as FormField[];

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      category: ['other', Validators.required],
      priority: ['Low', Validators.required],
      unit: [, Validators.required],
      status: ['pending'],
      creatorId: [''],
      creatorName: [''],
    });
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.form.patchValue({
          creatorId: user.id,
          creatorName: user.name,
        });
      }
    });
  }
  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch(showLoader());
    try {
      const fileName = `${Date.now()}_${this.selectedFile?.name}`;
      const { data, error } = await this.supabase
        .getClient()
        .storage.from('images')
        .upload(fileName, this.selectedFile);

      if (error) {
        console.error('Upload failed:', error.message);
        return;
      }

      const { data: publicUrlData } = this.supabase
        .getClient()
        .storage.from('images')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;
      this.form.value.image = publicUrl;
      this.store.dispatch(createMaintenanceLog({ maintenanceLog: this.form.value }));
    } catch (error) {
      console.error(error);
    } finally {
      this.store.dispatch(hideLoader());
    }
  }

  onFileSelected(file: File) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
