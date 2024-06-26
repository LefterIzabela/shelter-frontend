import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = false;
  private apiUrl = 'http://13.60.116.120:8080/shelterb-1.0-SNAPSHOT/api/users'; 

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post<User>(url, { username, password }).pipe(
      tap(user => {
        if (user) {
          this.isLogged = true;
          localStorage.setItem('user', JSON.stringify(user));
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
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.isLogged || localStorage.getItem('user') !== null;
  }

  getUserDetails(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
