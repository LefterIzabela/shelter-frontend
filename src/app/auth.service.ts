import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = false;
  private apiUrl = 'http://13.60.116.120:8080/shelterb-1.0-SNAPSHOT/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  login(username: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post<User>(url, { username, password }).pipe(
      tap(user => {
        if (user) {
          this.isLogged = true;
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('user', JSON.stringify(user));
          }
        }
      })
    );
  }

  signup(user: User): Observable<User> {
    const url = `${this.apiUrl}/signup`;
    return this.httpClient.post<User>(url, user);
  }

  logout() {
    this.isLogged = false;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('user');
    }
  }

  isLoggedIn(): boolean {
    return this.isLogged || this.getSession() !== null;
  }

  getUserDetails(): User | null {
    return this.getSession();
  }

  private getSession(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}
