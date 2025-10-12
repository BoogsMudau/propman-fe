import { Component, inject, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { createCommunityUpdate } from '../../state/community-updates/community-update.action';
import { Form, FormField } from '../../components/form/form';
import { SupabaseService } from '../../services/supabase.service';
import { loadUser } from '../../state/user/user.action';
import { selectUser } from '../../state/user/user.selector';

@Component({
  selector: 'app-create-update',
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    Form,
  ],
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

  fields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Short issue title' },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Describe the issue',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: this.tags,
    },
    { name: 'attachment', label: 'Attachment', type: 'file' },
  ] as FormField[];

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
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
      const fileName = `${Date.now()}_${this.selectedFile?.name}`;

      /**
       * const { data, error } = await this.supabase.storage
      .from('images') // replace with your bucket name
      .upload(fileName, this.selectedFile);

       */

      this.store.dispatch(
        createCommunityUpdate({
          update: {
            ...this.form.value,
            creatorId: 'c5e4f134-342d-43eb-b037-1ea024a63749',
            creatorName: 'Vhugala Mudau',
          },
        })
      );
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
