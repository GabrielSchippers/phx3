import { Component, OnInit, Input } from '@angular/core';
import {OwlCarousel} from 'ng2-owl-carousel';
import { DataService } from '../data.service';
 import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
 

@Component({
  selector: 'app-resources-shift',
  templateUrl: './resources-shift.component.html',
  styleUrls: ['./resources-shift.component.scss']
})
export class ResourcesShiftComponent implements OnInit {
    @Input() resources: any;

    constructor(private DataService: DataService, private _sanitizer: DomSanitizer) { }

   
 returnCat(cat){
     
     return 'Category';
     
 }
    
  ngOnInit() {
      
     
}

}