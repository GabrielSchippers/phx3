import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

    downloads: any;
    user: any;
    loading: boolean;
    cart: any;
    totals: any;
    
  constructor(private DataService: DataService) { }

   


  ngOnInit() {
      this.loading = true;
      this.cart = this.DataService.getCart();
      
      this.user = this.DataService.currentUser();
      console.log(this.user);
      
      
       
        let params = {
           page: 1,
           pageSize: 20,
             query: { "user.email": this.user.email },
           table: "downloads"
       }
       
        //Downloads
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.downloads = data.data;
                    console.log(this.downloads);
                  } 
            );   
            



  }

}
