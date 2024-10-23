import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: { name: string; email: string } = { name: '', email: '' };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Check if the user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    } else {
      // Fetch user data from the AuthService
      this.authService.getUserData().subscribe(userData => {
        this.user = userData || { name: '', email: '' }; // Update user property, ensure it's not undefined
      }, error => {
        // Handle errors, such as logging out if there's an issue fetching user data
        console.error('Error fetching user data', error);
        this.authService.logout(); // Optionally log out on error
        this.router.navigate(['/login']);
      });
    }
  }


  logout() {
    this.authService.logout(); // Call AuthService logout method
    this.router.navigate(['/login']); // Navigate to login page
  }
}
