import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../enviroments/environment';
import { User,UserCreation,Favorites,FavoritesCreation,LoginUser,LoginResponse,Comics } from './Marvel.Models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiMarvelService {

  // Inyectamos HttpClient de manera correcta
  private readonly http = inject(HttpClient);
  private readonly URLbase = `${environment.apiURL}`;

  constructor() { }

    // Crear un nuevo Usuario
    public RegisterUser(user: UserCreation): Observable<User> {
      return this.http.post<User>(`${this.URLbase}/auth/register`, user);
    }

    // Iniciar sesión
    public LoginUser(loginUser: LoginUser): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.URLbase}/auth/login`, loginUser);
    }

  //Obtener todos los comics
  public ObtenerComics(): Observable<Comics[]> {
    return this.http.get<any[]>(`${this.URLbase}/comics`).pipe(
      map(comics => comics.map(comic => ({
        id: comic.id,
        title: comic.title,
        // Concatenamos path y extension para obtener la URL completa de la imagen
        thumbnail: {
          path: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          extension: comic.thumbnail.extension  // Esto lo conservamos si necesitas la extensión por separado
        }
      })))
    );
  }

   // Crear un nuevo Favorito
   public CreateFavorite(favorites: FavoritesCreation): Observable<FavoritesCreation> {
    return this.http.post<FavoritesCreation>(`${this.URLbase}/favorites`, favorites);
  }

  public ObtenerComicsFavorite(userId : number): Observable<Favorites[]> {
    return this.http.get<any[]>(`${this.URLbase}/favorites/${userId}`).pipe(
      map(comics => comics.map(comic => ({
        ID: comic.ID,
        userId: comic.userId,
        comicId: comic.comicId,
        title: comic.title,
        thumbnail: comic.thumbnail
      })))
    );
  }

  // Eliminar un producto
  public borrar(userId: number,comicId: number): Observable<void> {
    return this.http.delete<void>(`${this.URLbase}/favorites/${userId}/${comicId}`);
  }
}
