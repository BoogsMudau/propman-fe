import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { createCommunityUpdate } from '../../state/community-updates/community-update.action';

@Component({
  selector: 'app-create-update',
  imports: [CommonModule, MatChipsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-update.html',
  styleUrl: './create-update.scss',
})
export class CreateUpdate {
  form: FormGroup;
  private store = inject(Store);
  tags = [
    { label: 'Event', value: 'event' },
    { label: 'Just for Fun', value: 'justForFun' },
    { label: 'Neighbour', value: 'neighbour' },
    { label: 'Venting', value: 'venting' },
    { label: 'Gate', value: 'gate' },
    { label: 'Question', value: 'Question' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // if (document.activeElement instanceof HTMLElement) {
      //   document.activeElement.blur();
      // }

      // for warning about button being still in focus after navigating

      this.store.dispatch(createCommunityUpdate({ update: this.form.value }));
    }
  }
}
