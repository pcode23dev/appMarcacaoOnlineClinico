import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginCredentials, AuthToken, JwtPayload, Utente } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const payload = this.decodeToken(token);
        if (payload.exp > Date.now() / 1000) {
          this.currentUserSubject.next(payload);
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginCredentials): Observable<AuthToken> {
    return this.apiService.get<Utente[]>(`utentes?email=${credentials.email}&senha=${credentials.senha}`)
      .pipe(
        delay(500), // Simular delay de rede
        map(users => {
          if (users.length === 1) {
            const user = users[0];
            const token = this.generateSimulatedJWT(user);
            const authToken: AuthToken = {
              token,
              expiresIn: 3600,
              user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: user.role
              }
            };
            
            localStorage.setItem('auth_token', token);
            this.currentUserSubject.next(this.decodeToken(token));
            
            return authToken;
          } else {
            throw new Error('Credenciais inválidas');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    
    try {
      const payload = this.decodeToken(token);
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user && user.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    return user && roles.includes(user.role);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  private generateSimulatedJWT(user: Utente): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      nome: user.nome,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora
      iat: Math.floor(Date.now() / 1000)
    }));
    const signature = btoa('simulated_signature');
    
    return `${header}.${payload}.${signature}`;
  }

  private decodeToken(token: string): JwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }
    
    return JSON.parse(atob(parts[1]));
  }
}