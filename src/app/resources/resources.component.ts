import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
    
    resources: any;
    shift: any;
    
    loading = true;
    
   constructor(private DataService: DataService) { }
   
    returnCat(cat){
     
     return 'Category';
     
 }
  
  
  
  ngOnInit() {
      
           
                    
       let params = {
           page: 1,
           pageSize: 100,
           query: { },
           table: "resources"
       }
       
        //Users
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.resources = data.data;
                    this.shift = Object.assign([], this.resources);
                    console.log(this.shift);
                    
                   } 
            );   
            
            
            
            
  


 }


}
