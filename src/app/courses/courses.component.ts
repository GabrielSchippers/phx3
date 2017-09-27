import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Parallax from 'parallax-js';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
   
     
  constructor(private DataService: DataService) { }
   collectionSize= 85135;
   page = 1;
   pageSize = 15;
   courses: any;
   query = '';
   loading = false;
       faculty = null;
   
    search(page){
        this.loading = true;
        let params = {
           page: page,
           pageSize: this.pageSize,
            query: { $or: [ { CourseCode: {'$regex': this.query} }, { CountryCode: {'$regex': this.query} } ] },
           table: "courses"
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
            query: {  },
           table: "courses"
       }
       
       //courses
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                         this.getFaculty();
                    this.courses = data.data;
                    this.collectionSize = data.total;
                    console.log(data);
                 } 
            );    
            
            
   


       
   }


  getFaculty(){
       
       let params = {
           page: 1,
           pageSize: 4,
          query: {  },
           table: "Faculty"
       }
       
        //set
      this.DataService.search(params).subscribe(
                data => {
                   this.loading = false;
                    this.faculty = data.data;
                    console.log(data.data);
                  
                 } 
            );   
            
   }




  ngOnInit() {
      
       var scene = document.getElementById('dots1');
       var parallax = new Parallax(scene);
       
        var scene = document.getElementById('dots2');
       var parallax = new Parallax(scene);


       this.load(this.page,this.pageSize); 
    

  }

}
