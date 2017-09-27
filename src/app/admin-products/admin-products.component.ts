import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

   constructor(private DataService: DataService) { }
   collectionSize= 85135;
   page = 1;
   pageSize = 15;
   set: any;
   query = '';
   
   loading = true;
   
    search(page){
        this.loading = true;
        console.log('serach!');
        console.log(this.query);
        
        let params = {
           page: page,
           pageSize: this.pageSize,
            query: { $or: [ { Name: {'$regex': this.query} }, { ProductCode: {'$regex': this.query} } ] },
           table: "ProductComponent"
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
            query: { $or: [ { Name: {'$regex': this.query} } ] },
           table: "ProductComponent"
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
