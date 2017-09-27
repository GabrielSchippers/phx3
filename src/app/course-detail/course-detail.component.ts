import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestOptions } from '@angular/http';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

    course = null;

    loading: boolean;
      id: any;
      sub: any;
      
  constructor( private route: ActivatedRoute, private DataService: DataService, private router: Router ) { }


get(id){
       this.loading = true;
       let params = {
           page: 1,
           pageSize: 1,
           query: {_id: id},
           table: "courses"
       }
       
       //Products
      this.DataService.search(params).subscribe(
                data => {
                    this.loading = false;
                    this.course = data.data[0];
                    console.log(this.course);
                 } 
            );    
  }
  
  
 


  ngOnInit() {
           
     this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       console.log(this.id);
       
       // In a real app: dispatch action to load the details here.
       if(this.id) this.get(this.id);
       });    
  }

}
