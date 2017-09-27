import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from "rxjs";
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
              '../../styles/proxima-font/stylesheet.css']
  
  
})
export class HeaderComponent implements OnInit {

  constructor(private DataService: DataService) { }
  
  timestamp = 1;
  loggedIn = false;
  timer = null;
  
  logout(){
      this.DataService.logout();
  }
  
  ngOnInit() {

      jQuery(document).ready(function(){
        jQuery('.bxslider').bxSlider({
          controls: false,
          auto: true,
          adaptiveHeight: true,
          mode: 'fade',
          pager: false,
          autoDelay: 1000,
          pause: 10000,
        });
      });

      this.loggedIn = this.DataService.isLoggedin();
      setInterval(() => {
        this.timestamp = this.timestamp + 1;
      },55000);
  }
}


