import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ApiMarvelService } from '../api-marvel.service';
import { AuthService } from '../auth.service'; 
import { Favorites } from '../Marvel.Models';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit  {
  favorites: Favorites[] = [];
  userId: number = 0; 
  currentPage: number = 1; // Página actual
  pageSize: number = 4; // Número de cómics por página
  errorMessage: string = '';

  constructor(private apiMarvelService: ApiMarvelService,
    private authService: AuthService
  ) { }
  

  ngOnInit(): void {
     // Obtener el userId almacenado en localStorage
     const storedUserId = localStorage.getItem('userId');
     if (storedUserId) {
       this.userId = parseInt(storedUserId, 10); // Convertir a número
       this.cargarFavoritos();  // Llamar la función para obtener los favoritos
     }
  }

    // Método para obtener los cómics de la página actual
    getPagedComics() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.favorites.slice(startIndex, startIndex + this.pageSize);
    }
  
    // Cambiar de página
    goToPage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  
    cargarFavoritos(): void {
      this.apiMarvelService.ObtenerComicsFavorite(this.userId).subscribe({
        next: (data) => {
          this.favorites = data;
        },
        error: (error) => {
          console.error('Error al obtener los cómics favoritos', error);
        }
      });
    }

    eliminarFavorito(userId: number, comicId: number): void {
      this.apiMarvelService.borrar(userId,comicId).subscribe({
        next: () => {
          // Filtrar la lista de favoritos para eliminar el que se borró
          this.favorites = this.favorites.filter(fav => fav.comicId !== comicId);
        },
        error: (error) => {
          console.error('Error al eliminar el cómic favorito', error);
        }
      });
    }

  
    // Método para ver detalles (puedes personalizar esta lógica)
    viewDetails(comic: any): void {
      console.log('Ver detalles de:', comic);
    }
  
    // Obtener el número total de páginas
    get totalPages(): number {
      return Math.ceil(this.favorites.length / this.pageSize);
    }
}
