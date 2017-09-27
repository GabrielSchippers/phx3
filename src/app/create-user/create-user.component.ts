import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
     user = {};
     
  constructor(private DataService: DataService ) { }

  createUser(user){
      
    let params = {
           table: "UserContact",
           obj: user
       }
       
       //Save Product
       this.DataService.save(params).subscribe(
                    data => { console.log(data);} 
                    );  
                    
                    
  }
  
  
  ngOnInit() {
  }

}
