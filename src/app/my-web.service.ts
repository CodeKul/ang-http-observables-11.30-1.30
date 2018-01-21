import { Observable } from 'rxjs/Observable';
import { Joke } from './joke';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class MyWebService {

  private subRvs : Subscription;

  constructor(
    private http: HttpClient
  ) { }

  postJoke(jk: Joke): Observable<Object> {
    return this.http.post(`http://localhost:3000/joke`, jk, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  reviews(onRes: (res: Object) => void) {
    this.subRvs = this.http.get('http://localhost:3000/rvws').subscribe(
      resObj => onRes(resObj)
    )
  }

  unsubscribeRvs() {
    this.subRvs.unsubscribe()
  }
}
