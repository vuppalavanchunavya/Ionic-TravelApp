import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories: any[] = [];
  trips: any[] = [];
  filteredCategories: any[] = [];
  filteredTrips: any[] = [];
  displayedTrips: any[] = [];
  searchTerm: string = '';
  wishlist: any[] = [];
  showAllTrips: boolean = false;
  notifications: string[] = [];
  currentNotificationIndex: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }

    // Sample data, replace with actual data fetch logic if needed
    this.categories = [
      { id: 1, name: 'Camp', image: 'assets/imgs/tent.png' },
      { id: 2, name: 'Mountains', image: 'assets/imgs/kheerganga.jpg' },
      { id: 3, name: 'Trekking', image: 'assets/imgs/trek.jpg' },
      { id: 4, name: 'Lake', image: 'assets/imgs/lake.jpg' },
    ];

    this.trips = [
      { id: 1, name: 'Banjir Kanal', category: 'Camp', image: 'assets/imgs/banjir.jpg', price: '12K' },
      { id: 2, name: 'Swiss Alps', category: 'Mountains', image: 'assets/imgs/swissalps.jpg', price: '20K' },
      { id: 3, name: 'Adi Kailash', category: 'Trekking', image: 'assets/imgs/kailash.jpg', price: '5K' },
      { id: 4, name: 'Tarsar Lake', category: 'Lake', image: 'assets/imgs/tarsar.jpg', price: '15K' },
    ];

    this.filteredCategories = [...this.categories];
    this.filteredTrips = [...this.trips];
    this.displayedTrips = [this.trips[0]]; // Show only the first trip initially
    this.wishlist = this.wishlistService.getWishlist();
    this.generateNotifications(); // Generate notifications on init
  }

  generateNotifications() {
    this.notifications = [
      'New camping gear sale!',
      'Check out the latest trekking tours!',
      'Exclusive offers on mountain trips!',
      'Discover new lakes to visit!'
    ];
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notifications',
      message: this.notifications[this.currentNotificationIndex],
      buttons: ['OK']
    });

    await alert.present();

    // Move to the next notification
    this.currentNotificationIndex = (this.currentNotificationIndex + 1) % this.notifications.length;
  }

  filterContent() {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(searchTermLower)
    );

    this.filteredTrips = this.trips.filter(trip =>
      trip.name.toLowerCase().includes(searchTermLower) ||
      trip.category.toLowerCase().includes(searchTermLower)
    );

    if (!this.showAllTrips) {
      this.displayedTrips = [this.filteredTrips[0]]; // Show only the first trip after filtering
    }
  }

  navigateToExplore() {
    this.showAllTrips = true; // Show all trips on explore
    this.displayedTrips = [...this.filteredTrips]; // Update displayed trips
  }

  isInWishlist(item: any): boolean {
    return this.wishlist.some(wishlistItem => wishlistItem.id === item.id);
  }

  toggleWishlist(item: any) {
    if (this.isInWishlist(item)) {
      this.wishlistService.removeFromWishlist(item);
    } else {
      this.wishlistService.addToWishlist(item);
    }
    // Update the wishlist view without navigation
    this.wishlist = this.wishlistService.getWishlist();
  }
}
