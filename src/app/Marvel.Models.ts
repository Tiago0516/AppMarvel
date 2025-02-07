export interface UserCreation {
    Name: string;
    Identification: string;
    Email: string;
    Password: string;
}

export interface LoginUser {
    Email: string;
    Password: string;
}

export interface LoginResponse {
    token: string;
    userId: number;
  }

export interface User {
    ID: number;
    Name: string;
    Identification: string;
    Email: string;
    Password: string;
}

export interface Comics {
    id: number;
    title: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }


export interface FavoritesCreation {
    userId: number;
    comicId: string;
    title: string;
    thumbnail: string;
}

export interface Favorites {
    ID: number;
    userId: number;
    comicId: number;
    title: string;
    thumbnail: string;
}

