import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';



@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {

  constructor(private DataService: DataService) { }
   collectionSize= 85135;
   page = 1;
   pageSize = 15;
   set: any;
   query = '';
   
   loading = true;
   
   delete(id){
       this.loading = true;
       let params = {
           id: id,
           table: "Pages"
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
        console.log('serach!');
        console.log(this.query);
        
        let params = {
           page: page,
           pageSize: this.pageSize,
            query: { $or: [ { Title: {'$regex': this.query} } ] },
           table: "Pages"
       }
       
        //set
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.page = page;
                    this.set = data.data;
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
       console.log('load!');
        let params = {
           page: page,
           pageSize: pageSize,
            query: { $or: [ { Title: {'$regex': this.query} } ] },
           table: "Pages"
       }
       
       //set
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.set = data.data;
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
