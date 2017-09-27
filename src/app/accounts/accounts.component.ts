import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private DataService: DataService) { }
   collectionSize= 85135;
   page = 1;
   pageSize = 15;
   users: any;
   query = '';
   
   loading: boolean;
   
   delete(id){
       this.loading = true;
       let params = {
           id: id,
           table: "UserContact"
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
        let params = {
           page: page,
           pageSize: this.pageSize,
           query: { $or: [ { FirstName: {'$regex': this.query} }, { LastName: {'$regex': this.query} }, { Email: {'$regex': this.query} } ] },
           table: "UserContact"
       }
       
        //Users
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.page = page;
                    this.users = data.data;
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
           query: { $or: [ { FirstName: {'$regex': this.query} }, { LastName: {'$regex': this.query} }, { Email: {'$regex': this.query} } ] },
           table: "UserContact"
       }
       
       //Users
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.users = data.data;
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
