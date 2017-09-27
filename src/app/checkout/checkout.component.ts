import { ViewChild, ElementRef, AfterViewInit, Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit {
    @ViewChild('shipping') shipping: ElementRef;
    @ViewChild('payment') payment: ElementRef;
     order = {
        user: {},
        cart: {},
        shipping: {},
        payment: {}
     }
     cart: any;
     error: null;
     totals: any;
     loading: boolean;
     
  constructor(private DataService: DataService, private router: Router ) { }
  showShipping(){
       jQuery(this.shipping.nativeElement).show();
                    jQuery(this.payment.nativeElement).hide();
  }
   getTotals(){
        this.error = null;
        this.loading = true;
        this.order.user = this.DataService.currentUser();
        
        this.DataService.getTotals(this.order).subscribe(
             data => {
                   this.loading = false;
                if(data.success){
                    this.totals = {
                        total: data.data.amount,
                        tax: data.data.items[data.data.items.length - 2],
                        shipping: data.data.items[data.data.items.length - 1],
                    }
                     jQuery(this.shipping.nativeElement).hide();
                    jQuery(this.payment.nativeElement).show();
                    
                }else{
                    this.error = data.error;
                }
                
                console.log(data);
               
                 
             }
         );
  }
  
  
  placeOrder(){
      this.loading = true;
     this.order.cart = this.DataService.getCart();
  
     
     this.order.user = this.DataService.currentUser();
      
      this.DataService.placeOrder(this.order).subscribe(
         data => {
             this.loading = false;
            if(data.success){
                this.completeOrder();
            }else{
                this.error = data.error;
                console.log(data);
            }
         });

  }
  
  completeOrder(){
      console.log('Order Completed!');
      this.router.navigateByUrl("/confirm");
  }
  
  ngAfterViewInit() {
      this.order.cart = this.DataService.getCart();
      
       
  }

}
