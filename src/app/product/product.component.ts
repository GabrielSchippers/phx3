import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Parallax from 'parallax-js';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

 products: any;
 loading: boolean;
 
  constructor(private DataService: DataService) { }
  
  filterPain(product) {
    if(product.metadata.category == "1") return true;
    return false;
  }
  
   filterNeuro(product) {
    if(product.metadata.category == "2") return true;
    return false;
  }
  
   filterBrain(product) {
    if(product.metadata.category == "3") return true;
    return false;
  }
  
  
   ngOnInit() {
       
       
       var scene = document.getElementById('scene1');
       var parallax = new Parallax(scene);
       
       var scene = document.getElementById('scene2');
       var parallax = new Parallax(scene);
       
       var scene = document.getElementById('scene3');
       var parallax = new Parallax(scene);
       
       var scene = document.getElementById('scene4');
       var parallax = new Parallax(scene);
       
       var scene = document.getElementById('scene5');
       var parallax = new Parallax(scene);
       
       var scene = document.getElementById('scene6');
       var parallax = new Parallax(scene);
       
      
      
        
       this.loading = true;
    
       
      //set
      this.DataService.getProducts().subscribe(
                data => {
                   this.loading = false;
                   this.products = data;
                   
                   console.log(this.products);
                    
                    
                 } 
            );   

  }


}
