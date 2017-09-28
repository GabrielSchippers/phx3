import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
//import {HostListener} from '@angular/core';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
//@HostListener ('window:popstate', ['$event'])

export class BlogComponent implements OnInit {
    loading: boolean;
    loading2: boolean;
    posts: any;
    recent: any;
    query: null;
    max = 12;
    min = 4;
    cat = 'uncategorized';
    
    constructor(private DataService: DataService, private sanitizer: DomSanitizer, private _cookieService:CookieService) { }
    // @HostListener ('window:popstate', ['$event'])
    // getCookie(key: string){
    //     return this._cookieService.get(key);
    // }
    
    // onPopState (event) {
    //     if (this.getCookie("yPosition")) {
    //         console.log("333333333", this.getCookie("yPosition"));
    //         setTimeout(() => {
    //           window.scrollTo(0, 500);
    //         }, 0);
    //     }
    // }
   safeUrl(img){
        return this.sanitizer.bypassSecurityTrustStyle('url(' + img + ')');
   }
   
    search(page){
        let searchQuery = {};
        
        if(this.query && this.cat){
             searchQuery = { $and: [ { title: {'$regex': this.query} }, { category: {$elemMatch: {slug:this.cat} }   } ] };
        }else{
             searchQuery = { $or: [ { title: {'$regex': this.query} }, { category: {$elemMatch: {slug:this.cat} }   } ] };
        }
       
       
        
        
        this.min = 0;
        this.loading = true;
        let params = {
           page: page,
           pageSize: 20,
           query: searchQuery,
           table: "posts",
           sort: {"date.year": -1, "date.month": -1, "date.day": -1}
       }
       
       console.log(params);
        //posts
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.posts = data.data;
                    console.log(data);
                 } 
            );   
            
   }

   sliceUp(){
       this.max = this.max + 4;
       console.log(this.max);
   }

   load(page){
        this.loading = true;
        let params = {
           page: page,
           pageSize: 40,
           query: {  },
           table: "posts",
           sort: {"date.year": -1, "date.month": -1, "date.day": -1}
       }
       
        //posts
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    if(!this.recent)this.recent = data.data;
                    this.posts = data.data;
                    console.log(data);
                 } 
            );   
            
   }



  ngOnInit() {
      
      this.load(1);
      
  }

}
