import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiMarvelService } from '../api-marvel.service';
import { AuthService } from '../auth.service'; 
import { Comics } from '../Marvel.Models';
import { FavoritesCreation } from '../Marvel.Models';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteModalComponent } from '../favorite-modal/favorite-modal.component';

/**
 * @Component - Define el DashboardComponent que se encarga de mostrar los cómics y gestionar favoritos.
 */
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  comics: Comics[] = []; // Lista de cómics obtenidos de la API
  currentPage: number = 1; // Página actual en la paginación
  pageSize: number = 4; // Número de cómics mostrados por página
  errorMessage: string = ''; // Mensaje de error en caso de fallos en la API
  isLoading: boolean = true; // Indica si la API está cargando los datos

  /**
   * @constructor - Inyecta los servicios necesarios para interactuar con la API y la autenticación.
   * @param apiMarvelService - Servicio para obtener los cómics de la API.
   * @param authService - Servicio de autenticación del usuario.
   * @param dialog - Servicio de diálogo para mostrar mensajes modales.
   */
  constructor(
    private apiMarvelService: ApiMarvelService,
    private authService: AuthService,
    public dialog: MatDialog 
  ) { }
  
  /**
   * @ngOnInit - Método que se ejecuta al inicializar el componente.
   * Se encarga de obtener la lista de cómics desde la API y mostrar un spinner mientras carga.
   */
  ngOnInit(): void {
    this.isLoading = true; // Activa la animación de carga
    this.apiMarvelService.ObtenerComics().subscribe(
      (data) => {
        this.comics = data;
        this.isLoading = false; // Desactiva la animación de carga una vez obtenidos los datos
      },
      (error) => {
        console.error('Error al obtener los cómics', error);
      }
    );
  }

  /**
   * @getPagedComics - Obtiene los cómics de la página actual para la paginación.
   * @returns Un subconjunto de cómics basado en la página actual y el tamaño de página.
   */
  getPagedComics() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.comics.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * @goToPage - Cambia la página actual, siempre dentro de los límites permitidos.
   * @param page - Número de página al que se desea ir.
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * @addToFavorites - Agrega un cómic a la lista de favoritos del usuario.
   * Verifica si el cómic ya está en favoritos antes de agregarlo.
   * @param comic - Objeto del cómic que se desea agregar a favoritos.
   */
  addToFavorites(comic: any): void {
    const userId = this.authService.getUserId();
    
    if (userId) {
      const numericUserId = parseInt(userId, 10);

      this.apiMarvelService.ObtenerComicsFavorite(numericUserId).subscribe({
        next: (favorites) => {
          const alreadyFavorite = favorites.some(fav => fav.comicId === comic.id);

          if (alreadyFavorite) {
            this.openModal('Este cómic ya está en favoritos');
          } else {
            const favorite: FavoritesCreation = {
              userId: numericUserId,
              comicId: comic.id,
              title: comic.title,
              thumbnail: comic.thumbnail.path
            };

            this.apiMarvelService.CreateFavorite(favorite).subscribe({
              next: () => {
                this.openModal('¡Favorito agregado con éxito!');
              },
              error: (error) => {
                this.openModal('Error al agregar favorito');
                console.error('Error al agregar favorito:', error);
              }
            });
          }
        },
        error: (error) => {
          console.error('Error al obtener favoritos:', error);
        }
      });
    } else {
      console.log('Usuario no autenticado');
    }
  }
  
  /**
   * @openModal - Abre un modal de diálogo para mostrar mensajes informativos.
   * @param message - Mensaje que se mostrará en el modal.
   */
  openModal(message: string): void {
    this.dialog.open(FavoriteModalComponent, {
      data: { message },
      width: '300px'
    });
  }

  /**
   * @viewDetails - Método para ver los detalles de un cómic (puede ser personalizado).
   * @param comic - Cómic del cual se quieren ver detalles.
   */
  viewDetails(comic: any): void {
    console.log('Ver detalles de:', comic);
  }

  /**
   * @totalPages - Calcula el número total de páginas disponibles.
   * @returns Número de páginas basado en el total de cómics y el tamaño de página.
   */
  get totalPages(): number {
    return Math.ceil(this.comics.length / this.pageSize);
  }
}
