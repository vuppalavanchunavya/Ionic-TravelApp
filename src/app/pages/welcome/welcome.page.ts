import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideImages: string[] = [];

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    this.slideImages = [
      'assets/imgs/1.jpg',
      'assets/imgs/2.jpg',
      'assets/imgs/3.jpg',
    ];
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  swiperSlideChanged(event: any) {
    console.log('Slide changed:', event);
    const currentIndex = event.activeIndex;
    console.log('Current slide index:', currentIndex);
  }
}
