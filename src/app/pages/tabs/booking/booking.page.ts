import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage {
  

  bookingDetails: any = {
    date: '',
    payment: ''
  };
  trip: any;
  paymentMethod: string = 'online';
  tripPrice: number = 0;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastController: ToastController 
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.trip = navigation.extras.state['trip'];
      if (this.trip) {
        this.tripPrice = parseFloat(this.trip.price.replace('K', '').replace('₹ ', '')) * 1000; // Convert price to number
      }
    }
  }

  onPaymentMethodChange(event: any) {
    this.paymentMethod = event.detail.value;
    if (this.paymentMethod === 'cash') {
      this.bookingDetails.payment = ''; // Clear payment field if switching to cash
    }
  }

  async onSubmit() {
    // Validation for cash payment
    if (this.paymentMethod === 'cash' && parseFloat(this.bookingDetails.payment) !== this.tripPrice) {
      await this.showToast('The cash payment amount must match the trip price.', 'danger');
      return;
    }

    // Perform booking logic here
    console.log('Booking Details:', this.bookingDetails);
    console.log('Trip:', this.trip);

    // Navigate back to the home page
    this.navCtrl.navigateBack('/tabs/home');
    await this.showToast('Your trip was booked successfully!', 'success');
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
