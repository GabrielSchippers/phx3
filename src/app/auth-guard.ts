import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { DataService } from './data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    
constructor(private DataService: DataService, private route: ActivatedRoute) {
     
   }


  canActivate() {
       
    if(this.DataService.isLoggedin('tk')) return true;
    return false;
  }
}