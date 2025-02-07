import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMarvelService } from '../api-marvel.service';
import { LoginUser,LoginResponse} from '../Marvel.Models';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiMarvelService,
     private router: Router,
     private authService: AuthService) {}
  login() {
    const userData: LoginUser = {
      Email: this.email,
      Password: this.password
    };

    this.apiService.LoginUser(userData).subscribe({
      next: (response: LoginResponse) => {
        if (response.token && response.userId) {  // Asegurar que la API devuelve ambos datos
          this.authService.setAuthData(response.token, response.userId); // Guardar en el servicio
          this.router.navigate(['/Dashboard']); // Redirigir al dashboard
        } else {
          this.errorMessage = 'No se recibió un token válido o ID de usuario.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Credenciales inválidas';
        console.error('Error en el inicio de sesión:', error);
      }
    });
  }

}
