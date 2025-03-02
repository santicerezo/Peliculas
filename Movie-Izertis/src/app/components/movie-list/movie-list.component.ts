import {Component, inject} from '@angular/core';
import {MovieService} from "../../service/movie.service";
import {MoviesListApiResponse} from "../../common/movie-list.interface";
import {SearchService} from "../../service/search.service";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private readonly movieService: MovieService = inject(MovieService)
  private readonly searchService: SearchService = inject(SearchService)
  moviesData !: MoviesListApiResponse

  constructor() {
    this.loadPopularMovies()
    this.loadSearh()

  }
  loadPopularMovies(){
    this.movieService.getPopularMovies().subscribe({
    next:(value)=>{
      this.moviesData = value
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
    }
  }

  loadSearh(){
    this.searchService.start().subscribe({
      next:(value)=>{
        this.moviesData = value
      },error(){
        console.log("Error tete")
      }
    })
  }



}
