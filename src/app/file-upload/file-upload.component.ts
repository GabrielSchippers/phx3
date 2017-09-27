import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
   
  
   
  @Output() filename: EventEmitter<any> = new EventEmitter<any>();
  constructor( private DataService: DataService) { }

   
    
    /// FILE UPLOAD////
    fileChanged(e: Event) {
        var target: HTMLInputElement = e.target as HTMLInputElement;
            for(var i=0;i < target.files.length; i++) {
                this.uploadr(target.files[i]);
                
            }
        }
        
        uploadr(img: File){
            var self = this;
            
            var filename = '';
            
             var formData: FormData = new FormData();
             formData.append("file", img, img.name);
                
               this.DataService.upload(formData).then((data: any) => {
                     this.filename.emit(data.data);
               });
                    
             
        }



  ngOnInit() {
  }

}
