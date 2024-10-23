import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersKey = 'users'; 

  constructor() { }

  // Create a new user
  createUser(user: { name: string, email: string, password: string }): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  // Find a user by email
  getUserByEmail(email: string): { name: string, email: string, password: string } | null {
    const users = this.getUsers();
    return users.find(user => user.email === email) || null;
  }

  // Get all users (for internal use or testing purposes)
  private getUsers(): { name: string, email: string, password: string }[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }
}
