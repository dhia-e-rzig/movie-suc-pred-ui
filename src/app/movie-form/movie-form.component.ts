import {Component, Inject, OnInit} from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { ProcessHTTPMsgService } from '../process-httpmsg.service';
import {Movie} from '../movie';
import { Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Props } from '../props';
import{DataLoaderService} from '../data-loader/data-loader.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  model =new Movie;
  tempsults= [];
  //result: Object;
  actors=[];
  directors=[];
  countries=[];
  languages=[];
  ratings=[];
  submitted = false;
  errMess= "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor( private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService,private dataService: DataLoaderService) {

    }

  ngOnInit() {
    this.dataService.getDirectors().subscribe(results => this.directors.push(results), errmsg => this.errMess = errmsg);
    this.dataService.getActors().subscribe(results => this.actors.push(results), errmsg => this.errMess = errmsg);
    this.dataService.getCountries().subscribe(results => this.countries.push(results), errmsg => this.errMess = errmsg );
    this.dataService.getLanguages().subscribe(results => this.languages.push(results), errmsg => this.errMess = errmsg );
    this.dataService.getRatings().subscribe(results => this.ratings.push(results), errmsg => this.errMess = errmsg );
  }

  onSubmit() {

    var ret=this.http.post<Movie>("http://127.0.0.1:8000/predict",this.model,this.httpOptions).pipe(catchError(this.processHTTPMsgService.handleError));
    //ret.subscribe(result => this.result=<any>result,
     // errmess => this.errMess = <any>errmess);
    console.log(this.errMess);
    this.submitted = true;
  }
  get diagnostic() { return JSON.stringify(this.model); }

}
