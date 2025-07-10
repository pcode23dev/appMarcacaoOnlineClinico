import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const hasRequiredRole = this.authService.hasAnyRole(requiredRoles);
    
    if (!hasRequiredRole) {
      // Redirecionar para página apropriada baseada no role do usuário
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        switch (currentUser.role) {
          case 'utente':
            this.router.navigate(['/dashboard-utente']);
            break;
          case 'administrativo':
            this.router.navigate(['/dashboard-admin']);
            break;
          case 'admin':
            this.router.navigate(['/admin-panel']);
            break;
          default:
            this.router.navigate(['/']);
        }
      } else {
        this.router.navigate(['/']);
      }
      return false;
    }

    return true;
  }
}