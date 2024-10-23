import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];

  constructor() { }

  getWishlist(): any[] {
    return this.wishlist;
  }

  addToWishlist(item: any): void {
    if (!this.wishlist.some(existingItem => existingItem.id === item.id)) {
      this.wishlist.push(item);
    }
  }

  removeFromWishlist(item: any): void {
    this.wishlist = this.wishlist.filter(existingItem => existingItem.id !== item.id);
  }
}
