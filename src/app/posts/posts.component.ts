import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private DataService: DataService) { }
   collectionSize=0;
   page = 1;
   pageSize = 15;
   posts: any;
   query = '';
   
   loading: boolean;
   
    delete(id){
       this.loading = true;
       let params = {
           id: id,
           table: "posts"
       }
         //courses
      this.DataService.delete(params).subscribe(
                data => {
                  
                  this.load(this.page,this.pageSize); 
                  
                  
                 } 
            );   
            
       console.log(params);
       
   }
   
   
    search(page){
        this.loading = true;
        let searchQuery = { $or: [ { title: {'$regex': this.query} } ] };
        let params = {
           page: page,
           pageSize: this.pageSize,
            query: searchQuery,
           table: "posts",
           sort: {"date.year": -1, "date.month": -1, "date.day": -1}
       }
       
        //posts
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.page = page;
                    this.posts = data.data;
                    this.collectionSize = data.total;
                    console.log(data);
                 } 
            );   
            
   }
  
  
   
   loadPage(evt){
       console.log(evt);
       if(this.query){
           this.search(evt);
       }else{
           this.load(evt,this.pageSize);
       }
       
   }
   
   
   load(page, pageSize){
       
       this.loading = true;
        let params = {
           page: page,
           pageSize: pageSize,
            query: {  },
           table: "posts",
           sort: {"date.year": -1, "date.month": -1, "date.day": -1}
       }
       
       //posts
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.posts = data.data;
                    this.collectionSize = data.total;
                    console.log(data);
                 } 
            );    
            
            
   


       
   }
   
   
  ngOnInit() {
        console.log(this.page);
          this.load(this.page,this.pageSize); 
  }

}
