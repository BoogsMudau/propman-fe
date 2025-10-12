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

@Component({
  selector: 'app-maintenance-log',
  imports: [MatChipsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
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
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
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
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.store.dispatch(createMaintenanceLog({ maintenanceLog: this.form.value }));
    }
  }
}
