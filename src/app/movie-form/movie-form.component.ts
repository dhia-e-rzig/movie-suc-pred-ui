import { Component, OnInit } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { ProcessHTTPMsgService } from '../process-httpmsg.service';
import {Movie} from '../movie';
import { Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Props } from '../props';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  model =new Movie;
  directors=[];
  actors=[];
  countries=[];
  languages=[];
  ratings=[];
  submitted = false;
  errMess= "";
  result="";
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) {
      
    }

  ngOnInit() {
      this.http.get<any>("http://127.0.0.1:8000/get-directors")
     .pipe(catchError(this.processHTTPMsgService.handleError))
     .subscribe( result => this.directors= result, errmess => this.errMess = errmess);
      this.http.get<Props[]>("http://127.0.0.1:8000/get-actors")
      .pipe(catchError(this.processHTTPMsgService.handleError))
      .subscribe(result => this.actors=<any>result, errmess => this.errMess = <any>errmess);
      this.http.get<Props[]>("http://127.0.0.1:8000/get-countries")
      .pipe(catchError(this.processHTTPMsgService.handleError))
      .subscribe(result => this.countries=<any>result, errmess => this.errMess = <any>errmess);
      this.http.get<Props[]>("http://127.0.0.1:8000/get-languages")
      .pipe(catchError(this.processHTTPMsgService.handleError))
      .subscribe(result => this.languages=<any>result, errmess => this.errMess = <any>errmess);
      this.http.get<Props[]>("http://127.0.0.1:8000/get-content-rating")
      .pipe(catchError(this.processHTTPMsgService.handleError))
      .subscribe(result => this.ratings=<any>result,errmess => this.errMess = <any>errmess);
  }

  
  onSubmit() { 
    
    var ret=this.http.post<Movie>("http://127.0.0.1:8000/predict",this.model,this.httpOptions).pipe(catchError(this.processHTTPMsgService.handleError)); 
    ret.subscribe(result => this.result=<any>result,
      errmess => this.errMess = <any>errmess);
    console.log(this.errMess);
    this.submitted = true; 
  }
  get diagnostic() { return JSON.stringify(this.model); }

}
