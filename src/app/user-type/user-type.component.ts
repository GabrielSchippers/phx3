import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Jsonp, URLSearchParams} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

@Injectable()
export class WikipediaService {
  constructor(private http: Http, private _jsonp: Jsonp) {}

  search(term: string) {
    if (term === '') {
      return Observable.of([]);
    }

     let payload = {
           page: 1,
           pageSize: 10,
           query: { $or: [ { FirstName: {'$regex': term} }, { LastName: {'$regex': term} }, { Email: {'$regex': term} } ] },
           table: "UserContact"
       }
    
    let wikiUrl = 'http://13.55.59.91:8080/search';
    let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  

   
   return this.http.post('http://13.55.59.91:8080/search', payload, options).map((res:Response) => {
            var responseData = res.json();
            console.log(responseData);
            return responseData.data;
        });
        
        
    
  }
}




@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  providers: [WikipediaService],
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {
  @Input() userModel: any;
  @Output() user: EventEmitter<any> = new EventEmitter<any>();
    
    
  query = 'tk@terrifickid.net';
  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private _service: WikipediaService) {}

 selected(e){
     this.user.emit(e.item);
 }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this._service.search(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

      formatter = (result: any) => result.FirstName + ' ' + result.LastName;
       
  ngOnInit() {
      
            
                 
            
  }

}
