import { Joke } from './joke';
import { MyWebService } from './my-web.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subInt: Subscription;
  subMy: Subscription;
  subPst : Subscription;

  title = 'app';

  titles = [
    'http',
    'observables',
    'web services',
    'posting data',
    'getting data'
  ]

  constructor(
    private webService: MyWebService
  ) {

  }

  ngOnInit() {
    /*this.subInt = IntervalObservable.create(2000).subscribe(
      () => {
        let ps = Math.floor(Math.random() * 6)
        console.log(ps)
        this.title = this.titles[ps]
      }
    )*/

    this.subMy = this.myObs().subscribe(
      str => console.log(str),
      err => console.log(err),
      () => console.log(`processing completed`)
    )

    this.postService()
    this.getService()
  }

  myObs(): Observable<string> {
    return Observable.create(sub => {
      for (let i in this.titles) {
        sub.next(i)
      }
      sub.complete()
      // sub.error()
    });
  }

  ngOnDestroy() {
    //this.subInt.unsubscribe()
    this.subMy.unsubscribe();
    this.subPst.unsubscribe();
    this.webService.unsubscribeRvs()
  }

  postService() {
    let jk = new Joke()
    jk.id = 789
    jk.joke = 'Today is sunday and we are working'
    jk.onRajani = false

    this.subPst = this.webService.postJoke(jk).subscribe(
      resObj => console.log(resObj),
      err => console.log(err),
      () => console.log(`completed`)
    );
  }

  getService() {
    this.webService.reviews(
      res => console.log(res)
    )
  }
}
