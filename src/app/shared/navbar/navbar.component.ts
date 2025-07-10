import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: any = null;
  private userSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getDashboardRoute(): string {
    if (!this.currentUser) return '/';
    
    switch (this.currentUser.role) {
      case 'utente':
        return '/dashboard-utente';
      case 'administrativo':
        return '/dashboard-admin';
      case 'admin':
        return '/admin-panel';
      default:
        return '/';
    }
  }

  getUserDisplayName(): string {
    return this.currentUser?.nome || 'Utilizador';
  }

  getUserRole(): string {
    switch (this.currentUser?.role) {
      case 'utente':
        return 'Utente';
      case 'administrativo':
        return 'Administrativo';
      case 'admin':
        return 'Administrador';
      default:
        return '';
    }
  }
}