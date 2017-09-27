import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestOptions } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  post = null;

      loading: boolean;
      id: any;
      sub: any;
      more: any;
      
  constructor( private route: ActivatedRoute, private DataService: DataService, private router: Router, private sanitizer: DomSanitizer ) { }

safeUrl(img){
        return this.sanitizer.bypassSecurityTrustStyle('url(' + img + ')');
   }
   
   dropComment(reply){
       console.log(reply);
         
       let sendComment = {
           id: this.id,
           reply: reply,
           user: this.DataService.currentUser()
       }  
       
      this.DataService.dropComment(sendComment).subscribe(
                data3 => {
                   
                    console.log(data3);
                 } 
            );   
   }
   
get(id){
       this.loading = true;
       let params = {
           page: 1,
           pageSize: 1,
           query: {slug: id},
           table: "posts"
       }
       
       //Products
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.post = data.data[0];
                    console.log(this.post);
                     this.load(1); 
                 } 
            );    
  }
  
  
 load(page){
        this.loading = true;
        let params2 = {
           page: page,
           pageSize: 4,
           query: {  },
           table: "posts",
           sort: {"date.year": -1, "date.month": -1, "date.day": -1}
       }
       
        //posts
      this.DataService.search(params2).subscribe(
                data2 => {
                    this.loading = false;
                    this.more = data2.data;
                    console.log(data2);
                 } 
            );   
            
   }




  ngOnInit() {
           
     this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       console.log(this.id);
       
       // In a real app: dispatch action to load the details here.
       if(this.id) this.get(this.id);
       });
       
         
  }

}
