import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cart: any;
    subtotal: any;
    login: any;
    loading: boolean;
    
  constructor( private DataService: DataService ) { }

  removeCart(item){
      this.DataService.removeCart(item);      
      this.cart = this.DataService.getCart();
      this.getSubtotal();
  }
  
  getSubtotal(){
    this.DataService.saveCart(this.cart);
    this.subtotal = this.DataService.subtotal(this.cart);  
  }
  
  ngOnInit() {
    
     this.cart = this.DataService.getCart();
     this.login = this.DataService.isLoggedin();
     this.getSubtotal();
  }

}
