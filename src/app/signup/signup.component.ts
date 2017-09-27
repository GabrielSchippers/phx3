import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private DataService: DataService) { }

  signup = {
      
  }
  
  ngOnInit() {
      
      
  }
  
  
  execute(){
      console.log('creating user');
      console.log(this.signup);
       //Signup User
      this.DataService.signup(this.signup).subscribe(
                data => {
                     console.log(data);
                } 
            );
            
            
  }

}
