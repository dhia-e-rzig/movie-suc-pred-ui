import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProcessHTTPMsgService} from '../process-httpmsg.service';
import {Observable} from 'rxjs';
import {Props} from '../props';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class DataLoaderService {
  baseURL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService ) { }

  getDirectors(): Observable<Props> {
    return this.http.get<Props>(this.baseURL + '/get-directors')
      .pipe(catchError(this.processHTTPMsgService.handleError))
      ;
  }

    getActors(): Observable<Props> {
      return  this.http.get<Props>(this.baseURL + '/get-actors')
        .pipe(catchError(this.processHTTPMsgService.handleError))
    ;}

    getCountries(): Observable<Props> {
      return  this.http.get<Props>(this.baseURL + '/get-countries')
        .pipe(catchError(this.processHTTPMsgService.handleError))
    ;}
    getLanguages(): Observable<Props> {
      return  this.http.get<Props>(this.baseURL + '/get-languages')
        .pipe(catchError(this.processHTTPMsgService.handleError))
    ;}
    getRatings(): Observable<Props> {
    return  this.http.get<Props>(this.baseURL + '/get-content-rating')
      .pipe(catchError(this.processHTTPMsgService.handleError))
      ;}

}
