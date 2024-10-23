import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form!: FormGroup;
  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private userService: UserService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.emailControl = this.form.get('email') as FormControl;
    this.passwordControl = this.form.get('password') as FormControl;
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Signing in...',
      spinner: 'circles'
    });
    await loading.present();

    const { email, password } = this.form.value;

    // Check if user exists and password matches
    const user = this.userService.getUserByEmail(email);
    if (!user || user.password !== password) {
      await loading.dismiss();
      this.showToast('Invalid email or password!', 'danger');
      return;
    }

    await loading.dismiss();
    this.showToast('Sign in successful!', 'success');
    this.router.navigate(['/tabs/home']);
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    await toast.present();
  }
}
