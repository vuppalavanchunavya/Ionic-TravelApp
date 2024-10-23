import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form!: FormGroup;
  selectedImage: any;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private userService: UserService
  ) { 
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
    });
  }

  checkPlatformForWeb() {
    return Capacitor.getPlatform() === 'web';
  }

  async takePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photo',
      buttons: [{
        text: 'From Photos',
        handler: () => this.takePhoto(CameraSource.Photos)
      }, {
        text: 'Take Picture',
        handler: () => this.takePhoto(CameraSource.Camera)
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async takePhoto(sourceType: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 50,
      source: sourceType,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });

    this.selectedImage = this.checkPlatformForWeb() ? image.dataUrl : image.webPath;
  }

  async onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Signing up...',
      spinner: 'circles'
    });
    await loading.present();

    const userData = this.form.value;

    // Check if user already exists
    const existingUser = this.userService.getUserByEmail(userData.email);
    if (existingUser) {
      await loading.dismiss();
      this.showToast('Email already registered!', 'danger');
      return;
    }

    this.userService.createUser(userData);
    await loading.dismiss();
    this.showToast('Sign up successful!', 'success');
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

