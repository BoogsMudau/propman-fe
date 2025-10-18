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
import { hideLoader, showLoader } from '../../state/loader/loader.action';

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
export class CreateUpdate implements OnInit {
  form: FormGroup;
  private store = inject(Store);
  user$ = this.store.select(selectUser);
  tags = [
    { label: 'Event', value: 'event' },
    { label: 'Just for Fun', value: 'justForFun' },
    { label: 'Neighbour', value: 'neighbour' },
    { label: 'Venting', value: 'venting' },
    { label: 'Gate', value: 'gate' },
    { label: 'Question', value: 'question' },
    { label: 'Other', value: 'other' },
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
      category: ['other'],
      creatorId: [''],
      creatorName: [''],
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch(showLoader());

    try {
      let publicUrl: string | undefined;
      if (this.selectedFile) {
        const fileName = `${Date.now()}_${this.selectedFile.name}`;
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

        publicUrl = publicUrlData.publicUrl;
      }

      if (!this.form.value.category) {
        this.form.value.category = 'other';
      }

      this.store.dispatch(
        createCommunityUpdate({
          update: {
            ...this.form.value,
            ...(publicUrl ? { image: publicUrl } : {}),
          },
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.store.dispatch(hideLoader());
    }
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

  onFileSelected(file: File) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
