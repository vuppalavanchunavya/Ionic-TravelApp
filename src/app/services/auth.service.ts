import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private userDataSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());

  constructor(private router: Router) { }

  // Login method with mock logic
  login(username: string, password: string): boolean {
    if (username === 'test' && password === 'password') { // Replace with actual authentication logic
      this.setToken({ username });
      this.userDataSubject.next({ username }); // Update user data observable
      return true;
    }
    return false;
  }

  // Logout method
  logout() {
    this.removeToken();
    this.userDataSubject.next(null); // Clear user data observable
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Get user data
  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  // Private methods for managing tokens and user data
  private setToken(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
  }

  private removeToken(): void {
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('user');
  }

  private getUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
