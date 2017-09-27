import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

   constructor(private DataService: DataService) { }
   collectionSize: any;
   page = 1;
   pageSize = 25;
   courses: any;
   query = '';
   loading = true;
   
   loadQuery = {};
  
  
    search(page){
        this.loading = true;
        let searchQuery = { $or: [ { CourseCode: {'$regex': this.query} }, { CountryCode: {'$regex': this.query} } ] };
        console.log(searchQuery);
        let params = {
           page: page,
           pageSize: this.pageSize,
           query: searchQuery,
           table: "courses",
          
       }
       
        //courses
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.page = page;
                    this.courses = data.data;
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
            query: this.loadQuery,
           table: "courses",
          
       }
       
       //courses
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.courses = data.data;
                    this.collectionSize = data.total;
                    console.log(data);
                 } 
            );    
            
            
   


       
   }
   
   delete(id){
      
       
       this.loading = true;
       let params = {
           id: id,
           table: "courses"
       }
         //courses
      this.DataService.delete(params).subscribe(
                data => {
                  
                  this.load(this.page,this.pageSize); 
                  
                  
                 } 
            );   
            
       console.log(params);
       
   }
  ngOnInit() {
        
        if(this.DataService.isHost()){
            let user = this.DataService.currentUser();
             console.log(user.email);
            this.loadQuery = { "host.Email": user.email };
        }
      
        console.log(this.page);
          this.load(this.page,this.pageSize); 
  }

}
