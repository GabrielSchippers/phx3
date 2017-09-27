import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

 constructor(private DataService: DataService) { }
   collectionSize= 85135;
   page = 1;
   pageSize = 15;
   courses: any;
   query = '';
   loading = true;
   
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
       
        let user = this.DataService.currentUser();
        console.log(user.email);
        
        this.loading = true;
        let params = {
           page: page,
           pageSize: pageSize,
            query:  { "instructor.user.Email" :  user.email } ,
           table: "courses"
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
   
   
  ngOnInit() {
        console.log(this.page);
          this.load(this.page,this.pageSize); 
           
  }


}
