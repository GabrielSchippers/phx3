import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
  '../../styles/proxima-font/stylesheet.css']
})
export class LoginComponent implements OnInit {

  public user: any;
  public error: any;
  loading: any;
  
  constructor(private DataService: DataService, public router: Router) {
     
   }
   email:any;
   password:any;
    
   
  login(){
      this.DataService.logout();
      this.loading = true;
      
      this.error = null;
      console.log('logging in!');
      //Login Check
      this.DataService.login(this.email,this.password).subscribe(
                data => {
                    
                    
                     this.loading = false;
                     
                    if(data.result == 'success'){
                       
                        this.DataService.storeLogin(data.data);
                        console.log(this.DataService.isLoggedin());
                        this.router.navigate(['/dashboard']);
                        
                    }else{
                        this.error = 'Incorrect Username/Password';
                         console.log(this.DataService.isLoggedin());
                    }
                    
                } 
            );

      
  }  
  
 
  
  
  ngOnInit() {
  }

}
