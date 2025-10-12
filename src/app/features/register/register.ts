import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Form, FormField } from '../../components/form/form';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Form],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  private store = inject(Store);

  fields: FormField[] = [
    { name: 'email', label: 'Email', type: 'text', placeholder: 'Email' },
    { name: 'fullName', label: 'fullName', type: 'text', placeholder: 'John Doe' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' },
  ] as FormField[];

  constructor(private fb: FormBuilder, private supabase: SupabaseService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const { error } = await this.supabase.getClient().auth.signUp({
        email: this.form.value.email,
        password: this.form.value.password,
        options: {
          data: {
            fullName: this.form.value.fullName,
            role: 'resident',
          },
        },
      });

      if (!error) {
        this.router.navigate(['tabs', 'home']);
      }
    }
  }
}
