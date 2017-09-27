import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    
    products: any;

  constructor(private DataService: DataService){}

  
  
  
  ngOnInit() {
      //Products
      this.DataService.listProducts(1,1000).subscribe(
                data => {
                     this.products = data;
                     console.log(this.products);
                } 
            );
  }

}
