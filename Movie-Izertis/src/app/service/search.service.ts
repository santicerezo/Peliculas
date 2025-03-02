import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environment/environment";
import {catchError, map, Observable, of, Subject, switchMap} from "rxjs";
import { MoviesListApiResponse} from "../common/movie-list.interface";


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly http: HttpClient = inject(HttpClient)
  private readonly QUERY_TITLE_URL = environment.baseUrl+"search/movie?query="
  private readonly TOKEN = environment.token
  private readonly query : Subject<string> = new Subject<string>()

  private readonly moviesFound$ : Observable<MoviesListApiResponse> = this.query.pipe(
    switchMap(queryValue=>{
      if(queryValue.trim()===""){
        return of({page:0,results:[],total_pages:0,total_results:0} )
      }
      const headers = new HttpHeaders({"Authorization":`Bearer ${this.TOKEN}`})
      return this.http.get<MoviesListApiResponse>(this.QUERY_TITLE_URL+queryValue,{headers}).pipe(
        catchError(() => of({page:0,results:[],total_pages:0,total_results:0}))
      )
    })
  )

  constructor() { }

  start(){
    return this.moviesFound$;
  }
  search(data:string):void{
    this.query.next(data)
  }


}
