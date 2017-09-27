import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
    
     obj = {};
     id: any;
     sub: any;
 
     loading: boolean;
 
    constructor( private route: ActivatedRoute, private DataService: DataService ) { }
    
      handle(e, key){
        this.obj[key] = e;
        console.log(e);
        this.edit(this.obj);
    }
    
    edit(obj){
    this.loading = true;
    let params = {
           table: "ProductComponent",
           obj: obj
       }
       
       //Save Product
       this.DataService.save(params).subscribe(
                    data => { 
                    this.loading = false;
                    //this.get(this.id); 
                    console.log(data);
                    } 
                    );  
  }
  
  get(id){
      this.loading = true;
       let params = {
           page: 1,
           pageSize: 1,
           query: {_id: id},
           table: "ProductComponent"
       }
       
       //Products
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.obj = data.data[0];
                    console.log(this.obj);
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
