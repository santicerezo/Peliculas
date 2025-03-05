import { Routes } from '@angular/router';
import {MovieListComponent} from "./components/movie-list/movie-list.component";
import {MovieDetailComponent} from "./components/movie-detail/movie-detail.component";

export const routes: Routes = [
  {
    path:"",
    redirectTo:"movie-list",
    pathMatch:"full"
  },
  {
    path:"movie-list",
    component:MovieListComponent
  },
  {
    path:"movie-detail/:id",
    component:MovieDetailComponent
  }
];

