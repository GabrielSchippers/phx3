import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

    isStaff:boolean;
    isInstructor:boolean;
    isHost: boolean;
    toggle = false;
    
    constructor(private DataService: DataService, public router: Router) {
     
   }
   
   toggleMenu(){
       this.toggle = !this.toggle;
   }
   
   logout(){
       this.DataService.logout();
       this.router.navigate(['/login']);
   }

   
  ngOnInit() {
      console.log(this.toggle);
      this.isStaff = this.DataService.isStaff();
      this.isInstructor = this.DataService.isInstructor();
      this.isHost = this.DataService.isHost();
  }

}
