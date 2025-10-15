import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  // Example users
  users: User[] = [
    { username: 'admin', password: 'Administrator123!', role: 'admin' },
    { username: 'user', password: 'User123!', role: 'user' }
  ];

  constructor(private router: Router) {}

  onLogin() {
    const user = this.users.find(u => u.username === this.username && u.password === this.password);
    console.log(user);
    if (user) {
      // Save user info in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Navigate based on role
      if (user.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/tasks']);
      }
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
