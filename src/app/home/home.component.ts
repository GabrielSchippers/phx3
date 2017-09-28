import { ViewChild, ElementRef, AfterViewInit, OnInit, Component, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import Parallax from 'parallax-js';
import Swiper from 'swiper';
import { CookieService } from 'ngx-cookie';
import { Router, NavigationStart, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/first';
import {HostListener} from '@angular/core';
declare var jQuery: any;
@HostListener ('window:popstate', ['$event'])
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('accord') accord: ElementRef;

  private _routeScrollPositions: {[url: string]: number} = {};
  private _subscriptions: Subscription[] = [];

  loading: boolean;
  posts: any;
  index: number;
  imgUrl: any;
  text: any;
  swiper: any;
  flag: any;
  opacity: any;
  delay: number;
  imgUrlArr = [
    "./assets/carousel/brain_train/1.jpg",
    "./assets/carousel/brain_train/2.jpg",
    "./assets/carousel/brain_train/3.jpg",
    "./assets/carousel/brain_train/4.jpg",
    "./assets/carousel/neurodynamics/neuro1.jpg",
    "./assets/carousel/neurodynamics/neuro2.jpg",
    "./assets/carousel/neurodynamics/neuro3.jpg",
    "./assets/carousel/neurodynamics/neuro4.jpg",
    "./assets/carousel/explain_pain/pain1.jpg",
    "./assets/carousel/explain_pain/pain2.jpg",
    "./assets/carousel/explain_pain/pain3.jpg",
    "./assets/carousel/explain_pain/pain4.jpg",
    "./assets/carousel/philosophy/philo1.jpg",
    "./assets/carousel/philosophy/philo2.jpg",
    "./assets/carousel/philosophy/philo3.jpg",
    "./assets/carousel/philosophy/philo4.jpg",                    
  ];

  textArr = [
    "Brain Training",
    "",
    "To create and provide Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dol Lor111",
    "NOI reinvest directly Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sr sit amet111",
    "Explain Pain",
    "",
    "To create and provide Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dol Lor222",
    "NOI reinvest directly Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sr sit amet222",
    "Neurodynamics",
    "",
    "To create and provide Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dol Lor333",
    "NOI reinvest directly Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sr sit amet333",
    "Philosophy",
    "",
    "To create and provide Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dol Lor444",
    "NOI reinvest directly Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sr sit amet444",
  ];

  test(el){
      console.log(el);
  }

  constructor(private router: Router, private location: Location, private DataService: DataService, private sanitizer: DomSanitizer, private _cookieService:CookieService, ) { }

  getCookie(key: string){
    return this._cookieService.get(key);
  }

  setCookie(key: string, value: string){
    this._cookieService.put(key, value);
  }

  safeUrl(img){
        return this.sanitizer.bypassSecurityTrustStyle('url(' + img + ')');
   }

  blog(){
        this.loading = true;
        jQuery("app-header").hide()
        let params = {
          page: 1,
          pageSize: 4,
          query: {  },
          table: "posts"
        }
        //posts
      this.DataService.search(params).subscribe(
                data => {
                    jQuery("app-header").stop(true).fadeIn({
                      duration: 5000,
                      queue: false
                    }).css('display', 'none').slideDown(2000)

                    this.loading = false;
                    this.posts = data.data;
                    console.log(data);
                 }
            );
   }

  ngOnInit() {

      this.imgUrl = this.imgUrlArr.slice(0, 4);
      this.text = this.textArr.slice(0, 4)
      if (this.getCookie("visited") == "1" ) {
        jQuery(".sliding-hero .fullscreen_sliding").css({  display: "none" });
        this.delay = 0;
      }
      if (this.getCookie("visited") == null || this.getCookie("visited") == undefined) {
        jQuery(".sliding-hero .fullscreen_sliding").delay(10000).animate({ width: "25%", opacity: 0.5, margin: 0, height: "100%", left: "50%" }, 1000 );
        jQuery(".sliding-hero .fullscreen_sliding").delay(0).animate({  opacity: 0 }, 1000 );
        this.delay = 10000;
        this.setCookie ("visited", "1");
        this.opacity = 0;
      }
      
      
  }

  ngAfterViewInit() {
      this.blog();
      this.index = 0;
      setTimeout (()=>{
        this.swiper = new Swiper('.swiper-container', {
          slidesPerView: 4,
          initialSlide: 0,
          //loopedSlides: 6,
          // loop: true,
          autoplay: {
            enabled: true,
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
          },
        });
        this.swiper.on('slideChangeEnd', this.endSlider.bind(this))
      }, this.delay);

    //this.swiper.on('slideChangeEnd', this.endSlider.bind(this))

    var scene = document.getElementById('scene1');
    var scene2 = document.getElementById('scene2');
    var scene3 = document.getElementById('scene3');
    var scene4 = document.getElementById('scene4');
    var scene5 = document.getElementById('scene5');
    var scene6 = document.getElementById('scene6');
    var scene7 = document.getElementById('scene7');

  //  var parallax = new Parallax(scene);
    var parallax3 = new Parallax(scene3);
    var parallax4 = new Parallax(scene4);
    var parallax5 = new Parallax(scene5);
    var parallax6 = new Parallax(scene6);
    var parallax7 = new Parallax(scene7);

      //console.log("parallax scene: ", scene3);

  }

  endSlider(){
      this.index ++;
      if (this.index == 16){
        this.index = 0;
      }
      if (this.index % 4 == 0) {
        jQuery(".floating-text h1, p, a").delay(500).animate({ opacity: 0.1 }, 600);​
        jQuery(".swiper-slide img").delay(700).animate({ opacity: 0 }, 700);​
        // jQuery(".left-mask-container").delay(500).animate({ opacity: 0}, 500);​
        // jQuery(".right-mask-container").delay(500).animate({ opacity: 0}, 500);​
        setTimeout(() =>{
          
          this.imgUrl = this.imgUrlArr.slice(this.index, this.index+4);
          this.text = this.textArr.slice(this.index, this.index + 4); 
          this.swiper.slideTo(0);
          jQuery(".swiper-slide img").delay(0).animate({ opacity: 1 }, 700);​
          jQuery(".floating-text h1, p, a").delay(400).animate({ opacity: 1 }, 750);​
          // jQuery(".left-mask-container").delay(400).animate({ opacity: 1}, 250);​
          // jQuery(".right-mask-container").delay(400).animate({ opacity: 1}, 250);​
        }, 1000);
      }
      else {
        return;
      }
      
      // jQuery(".floating-text h1, p, a").delay(1000).animate({ opacity: 0 }, 700);​
      // this.imgUrl = this.imgUrlArr.slice(4 * this.index, 4 * (this.index + 1));
      // setTimeout(() => {
      //this.text = this.textArr.slice(4 * this.index, 4 * (this.index + 1)); 
      // jQuery(".floating-text h1, p, a").delay(0).animate({ opacity: 1 }, 700);​
      // }, 2500);
      /*
      if (this.swiper.isEnd){
        console.log("end is reached");
        console.log("swiper:", this.swiper);
        this.swiper.appendSlide([
          '<div class="swiper-slide"><img src=' + this.imgUrl[0] + '/></div>', 
          '<div class="swiper-slide"><img src=' + this.imgUrl[1] + '/></div>',
          '<div class="swiper-slide"><img src=' + this.imgUrl[2] + '/></div>',
          '<div class="swiper-slide"><img src=' + this.imgUrl[3] + '/></div>',
        ]);
        this.swiper.removeSlide([0, 1, 2, 3]);
        // if (this.swiper) { this.swiper.destroy(); this.swiper = null; }
        // this.swiper = new Swiper('.swiper-container', {
        //   slidesPerView: 4,
        //   initialSlide: 1,
        //   //loopedSlides: 6,
        //   loop: true,
        //   autoplay: {
        //     enabled: true,
        //     delay: 2500,
        //     disableOnInteraction: false,
        //   },
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        //   },
        //   navigation: {
        //     nextEl: '.slider-next',
        //     prevEl: '.slider-prev',
        //   }
        // });
        this.swiper.on('slideChangeEnd', this.endSlider.bind(this));
      }
      */
    }
  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  savePosition(){
    var yPosition = window.pageYOffset;
    this.setCookie ("yPosition", "yPosition");
    console.log("!!!!!", this.getCookie("yPosition"));
  }
}
