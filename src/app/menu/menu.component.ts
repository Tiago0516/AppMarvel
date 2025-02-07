import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; 


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isInDashboard: boolean = false;
  isInFavorites: boolean = false;
  isInLoginOrRegister: boolean = false;

  constructor(private router: Router,
     private route: ActivatedRoute,
        private authService: AuthService
    ) {
    // Aquí filtras solo los eventos NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Verificar la ruta actual
      this.isInDashboard = this.router.url.includes('Dashboard') ;
      this.isInFavorites = this.router.url.includes('Favorites') ;
      this.isInLoginOrRegister = this.router.url.includes('Login') || this.router.url.includes('Register') ;
    });
  }

  logout() {
    this.authService.clearAuthData();  // Eliminar datos de autenticación
    this.router.navigate(['/Login']);  // Redirigir al login
  }
}
