import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInStatus = false;
  private readonly USER = 'admin';
  private readonly PASS = '1234';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.USER && password === this.PASS) {
      this.isLoggedInStatus = true;
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedInStatus = false;
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus || localStorage.getItem('loggedIn') === 'true';
  }
}
