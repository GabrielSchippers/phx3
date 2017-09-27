import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-faculty-edit',
  templateUrl: './faculty-edit.component.html',
  styleUrls: ['./faculty-edit.component.scss']
})
export class FacultyEditComponent implements OnInit {

 obj = {};
     id: any;
     sub: any;
 
     loading: boolean;
 
    constructor( private route: ActivatedRoute, private DataService: DataService ) { }
    
      handle(e, key){
        this.obj[key] = e;
        console.log(e);
        
    }
    
    edit(obj){
    this.loading = true;
    let params = {
           table: "Faculty",
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
           table: "Faculty"
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
