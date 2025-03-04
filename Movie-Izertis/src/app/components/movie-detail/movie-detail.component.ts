import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MovieService} from "../../service/movie.service";
import {MovieDetail} from "../../common/movie-detail.interface";
import {environment} from "../../environment/environment";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faArrowLeft, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faImdb} from "@fortawesome/free-brands-svg-icons";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit{
  @Input('id') id!:number

  private readonly movieService : MovieService = inject(MovieService)
  movie!:MovieDetail
  constructor() {

  }
  ngOnInit(): void {
    this.loadMovie()
  }
  loadMovie(){
    this.movieService.getOneMovie(this.id).subscribe({
      next:(value)=>{
        this.movie = value

      },
      complete:()=>{
        console.log("Movie loaded successfully")
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }
  getImageUrl(size:string,endPath:string){
    return environment.imageBaseUrl+size+"/"+endPath
  }


  protected readonly faThumbsUp = faThumbsUp;
  protected readonly faThumbsDown = faThumbsDown;
  protected readonly faImdb = faImdb;
  protected readonly faArrowLeft = faArrowLeft;
}
