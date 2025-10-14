import { Component, inject } from '@angular/core';
import { Form, FormField } from '../../components/form/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { hideLoader, showLoader } from '../../state/loader/loader.action';
import { loadUser } from '../../state/user/user.action';

@Component({
  selector: 'app-login',
  imports: [Form],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  private store = inject(Store);
  error = '';

  fields: FormField[] = [
    { name: 'email', label: 'Email', type: 'text', placeholder: 'Email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' },
  ] as FormField[];

  constructor(private fb: FormBuilder, private supabase: SupabaseService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(showLoader());
      const { data, error } = await this.supabase.getClient().auth.signInWithPassword({
        email: this.form.value.email,
        password: this.form.value.password,
      });
      this.store.dispatch(hideLoader());

      if (error) {
        if (error?.code === 'invalid_credentials') {
          this.error = 'Invalid credentials';
        } else {
          this.error = error?.message;
        }
      }
      if (!error) {
        this.store.dispatch(loadUser());
        this.router.navigate(['tabs', 'home']);
      }
    }
  }

  goRegister() {
    this.router.navigate(['register']);
  }

  goHome() {
    this.router.navigate(['tabs', 'home']);
  }
}
