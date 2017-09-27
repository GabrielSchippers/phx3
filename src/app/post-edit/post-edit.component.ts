import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';

const now = new Date();

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
    
   obj = {
       date: {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()},
       author: this.DataService.currentUser(),
       category: [{
           slug: 'uncategorized',
       }],
       Status: 2
   };
     id: any;
     sub: any;
     loading: boolean;
 
    constructor( private route: ActivatedRoute, private DataService: DataService ) { }
    
      handle(e, key){
        this.obj[key] = e.data;
        if(key == 'image') this.obj[key] = 'http://13.55.59.91/uploads/' + e.data;
    }
    
    edit(obj){
    this.loading = true;
    let params = {
           table: "posts",
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
      this.loading = true;
       let params = {
           page: 1,
           pageSize: 1,
           query: {_id: id},
           table: "posts"
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
