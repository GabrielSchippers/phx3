import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

      obj = {};
     id: any;
     sub: any;
     loading = true;
 
    constructor( private router: Router, private route: ActivatedRoute, private DataService: DataService ) { }


  addToCart(product){
      console.log(product);
       this.DataService.addToCart(product);
        this.router.navigate(['/cart']);
  }
  
  get(id){
       this.loading = true;
       let params = {
           id: id
         
       }
       
       //Products
      this.DataService.getProduct(params).subscribe(
                data => {
                    this.loading = false;
                    this.obj = data;
                    this.obj['qty'] = 1;
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
