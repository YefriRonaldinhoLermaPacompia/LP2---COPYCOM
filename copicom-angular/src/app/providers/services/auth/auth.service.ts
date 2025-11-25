import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { AuthResponse } from '../../../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  /** ---- LOGIN CORRECTO ---- */
  login(body: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(END_POINTS.authLogin, body);
  }

  /** ---- REGISTER ---- */
  register(body: any): Observable<string> {
    return this.http.post<string>(END_POINTS.authRegister, body, { responseType: 'text' as 'json' });
  }

  /** ---- TOKEN STORAGE ---- */
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setAccessToken(accessToken: string | null): void {
    if (accessToken != null) {
      localStorage.setItem(this.TOKEN_KEY, accessToken);
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
