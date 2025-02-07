import { DashboardComponent } from './dashboard/dashboard.component';
import{ LoginComponent } from './login/login.component';
import{ RegisterComponent} from './register/register.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'Dashboard', component: DashboardComponent},
    {path: 'Register', component: RegisterComponent},
    {path: 'Favorites', component: FavoritesComponent},
    { path: 'Logout', component: LoginComponent },

];