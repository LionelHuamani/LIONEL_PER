import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === '1';
  }
  login(): void { localStorage.setItem('isLoggedIn', '1'); }
  logout(): void { localStorage.removeItem('isLoggedIn'); }
}