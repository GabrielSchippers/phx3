import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/first';
 



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _routeScrollPositions: {[url: string]: number} = {};
  private _subscriptions: Subscription[] = [];
  _popState: boolean = false;

    constructor(private router: Router, private location: Location, private platformLocation: PlatformLocation){}
        
        nav = false;
     
  ngOnInit() {
        

      this._subscriptions.push(
        // save scroll position on route change
        this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
          console.log("111", prevRouteEvent);
          console.log("222", currRouteEvent);
          
          if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
            // url path without parameters
            let urlPath = (prevRouteEvent.urlAfterRedirects || prevRouteEvent.url ).split(';',1)[0];
            console.log("url path : ", urlPath);
            this._routeScrollPositions[urlPath] = window.pageYOffset;
          }
        })
      );
      // restore scroll position on back or forward
      this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                if (this._popState) {
                    let urlPath = (evt.urlAfterRedirects || evt.url).split(';',1)[0];
                    console.log("url path1 : ", evt.urlAfterRedirects);
                    console.log("url path 2: ", (evt.urlAfterRedirects || evt.url));
                    console.log('scroll to ', this._routeScrollPositions[urlPath] || 0)
                    setTimeout(() => {
                        window.scrollTo(0, this._routeScrollPositions[urlPath] || 0);
                    }, 0);
                    this._popState = false;
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
      /* this.location.subscribe(event => {
          // back or forward, wait for router navigation end
          let routerNavigationEnd = this.router.events.first(event => event instanceof NavigationEnd)
          .subscribe((navigationEndEvent: NavigationEnd) => {
            // url path without parameters
            let urlPath = (navigationEndEvent.urlAfterRedirects || navigationEndEvent.url).split(';',1)[0];
            console.log("url path1 : ", navigationEndEvent.urlAfterRedirects);
            console.log("url path 2: ", (navigationEndEvent.urlAfterRedirects || navigationEndEvent.url));
            console.log('scroll to ', this._routeScrollPositions[urlPath] || 0)
            setTimeout(() => {
              window.scrollTo(0, this._routeScrollPositions[urlPath] || 0);
            }, 0);
          });
      }); */
      this.platformLocation.onPopState((event) => {
        console.log('pop state ', event);
        this._popState = true;
      })
    }
}
