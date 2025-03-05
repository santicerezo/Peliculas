import {Component, inject} from '@angular/core';
import {MovieService} from "../../service/movie.service";
import {MoviesListApiResponse} from "../../common/movie-list.interface";
import {SearchService} from "../../service/search.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {NgStyle} from "@angular/common";
import {environment} from "../../environment/environment";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    FaIconComponent,
    NgStyle,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private readonly movieService: MovieService = inject(MovieService)
  private readonly searchService: SearchService = inject(SearchService)
  moviesData !: MoviesListApiResponse
  showSuggestions:boolean= false

  constructor() {
    this.loadPopularMovies()
    this.loadSearh()

  }
  loadPopularMovies(){
    this.movieService.getPopularMovies().subscribe({
    next:(value)=>{
      this.moviesData = value
      this.showSuggestions = true
    }
    })
  }

  onChangeForm(event:any){
    const data = event.target.value as string
    if(data.trim()===""){
      this.loadPopularMovies()
    }
    else {
      this.searchService.search(data)
      this.showSuggestions = false
    }
  }

  loadSearh(){
    this.searchService.start().subscribe({
      next:(value)=>{
        this.moviesData = value
      }
      ,error(err){
        console.log(err)
      }
    })

  }

  getImageUrl(size:string,endPath:string){
    return environment.imageBaseUrl+size+"/"+endPath
  }


  protected readonly faMagnifyingGlass = faMagnifyingGlass;
}
