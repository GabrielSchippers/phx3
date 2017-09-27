import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestOptions } from '@angular/http';

 

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
    
     obj = {
         image: '',
         attendance: [],
         dates: [],
         events: [],
         Status: 1,
         Approved: 1
     };
     
     event = {
         dates: [],
         attendance: []
     };
     
     id: any;
     sub: any;
     file: File;
 
     loading: boolean;
 
    constructor( private route: ActivatedRoute, private DataService: DataService, private router: Router ) { }
    
  
    
    
    handle(e, key){
        this.obj[key] = e;
        console.log(e);
    }
    
     handleEvent(e, key){
        this.obj[key] = e;
        console.log(e);
    }
    
     handleEventB(event, e, key){
        event[key] = e;
        console.log(e);
    }

    
    addUser(event, item){
         event.attendance.push(item);
    }
    
    
    addDate(event,date){
       if(date)event.dates.push(date);
       
    }
    
    removeDate(event,key){
        console.log(event);
        var newDates = [];
        for (var _i = 0; _i < event.dates.length; _i++) {
            if(key == _i) continue;
            newDates.push(event.dates[_i]);
          }
          event.dates = newDates;
    }

    

    removeUser(event,key){
        var newUser = [];
        for (var _i = 0; _i < event.attendance.length; _i++) {
            if(key == _i) continue;
            newUser.push(event.attendance[_i]);
          }
          event.attendance = newUser;
    }
    
    addEvent(event){
        var copy = Object.assign({}, event);
        this.obj.events.push(copy);
        this.edit(this.obj);
    }
    
    deleteEvent(key){
         var newEvents = [];
        for (var _i = 0; _i < this.obj.events.length; _i++) {
            if(key == _i) continue;
            newEvents.push(this.obj.events[_i]);
          }
          this.obj.events = newEvents;
           this.edit(this.obj);
    }
    
    edit(obj){
    this.loading = true;
    let params = {
           table: "courses",
           obj: obj
       }
       
       //Save Product
       this.DataService.save(params).subscribe(
                    data => { 
                        if(!this.obj['_id']){
                         this.router.navigate(['/dashboard/courses/detail/' + data.data.upserted[0]._id]);
                         }else{
                             this.loading = false;
                         }
                        
                    } 
                    );  
  }
  
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
                    this.obj = data.data[0];
                    console.log(this.obj);
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
