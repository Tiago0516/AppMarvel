import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiMarvelService } from '../api-marvel.service';
import { UserCreation } from '../Marvel.Models';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  name: string = '';
  identification: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiMarvelService, private router: Router) {}
  
  register() {
    const userData: UserCreation = {
      Name: this.name,
      Identification: this.identification,
      Email: this.email,
      Password: this.password
    };

    this.apiService.RegisterUser(userData).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
      },
      error: (error) => {
        this.errorMessage = 'Error al registrar usuario';
        console.error('Error en el registro:', error);
      }
    });
  }

 
}



