import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'file' | 'password';
  placeholder: string;
  options?: { label: string; value: any }[];
}
@Component({
  selector: 'app-form',
  imports: [CommonModule, MatChipsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  @Input() form!: FormGroup;
  @Input() fields: FormField[] = [];
  @Input() submitLabel: string = 'Submit';
  @Output() submitForm = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<File>();

  onSubmit() {
    this.submitForm.emit();
  }
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.fileSelected.emit(file);
  }
}
