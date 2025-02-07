import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Guardar el token y userId en LocalStorage
  setAuthData(token: string, userId: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString()); // Guardar userId como string
  }

  // Obtener el token del LocalStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener el userId del LocalStorage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Eliminar datos de autenticación al cerrar sesión
  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
