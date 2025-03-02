import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environment/environment";
import {Observable} from "rxjs";
import { MoviesListApiResponse} from "../common/movie-list.interface";
import {MovieDetail} from "../common/movie-detail.interface";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly BASE_URL = environment.baseUrl+"movie/"
  private readonly POPULAR_URL = this.BASE_URL+"popular"
  private readonly TOKEN = environment.token

  private readonly http: HttpClient = inject(HttpClient)

  constructor() { }

  getPopularMovies():Observable<MoviesListApiResponse>{
    const headers = new HttpHeaders({"Authorization":`Bearer ${this.TOKEN}`})

    return this.http.get<MoviesListApiResponse>(this.POPULAR_URL,{headers})
  }
  getOneMovie(id:number):Observable<MovieDetail>{
    const headers: HttpHeaders = new HttpHeaders({"Authorization":`Bearer ${this.TOKEN}`})
    return this.http.get<MovieDetail>(this.BASE_URL+id, {headers})
  }
}
