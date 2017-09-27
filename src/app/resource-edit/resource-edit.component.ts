import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.scss']
})
export class ResourceEditComponent implements OnInit {

   obj = {};
     id: any;
     sub: any;
 
     loading: boolean;
 
    constructor( private route: ActivatedRoute, private DataService: DataService ) { }
    
      handle(e, key){
        this.obj[key] = e;
        console.log(e);
        console.log(this.obj);
        console.log(key);
    }
    
    
    edit(obj){
    this.loading = true;
    let params = {
           table: "resources",
           obj: obj
       }
       
       //Save Product
       this.DataService.save(params).subscribe(
                    data => { 
                        this.loading = false;
                        if(data.data.upserted)this.obj['_id'] = data.data.upserted[0]._id;
                    //this.get(this.id); 
                    console.log(data);
                    } 
                    );  
  }
  
  get(id){
      
       let params = {
           page: 1,
           pageSize: 1,
           query: {_id: id},
           table: "resources"
       }
       this.loading = true;
       
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
