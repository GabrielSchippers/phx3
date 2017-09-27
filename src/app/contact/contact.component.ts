import { Component, OnInit } from '@angular/core';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss',
  '../../styles/proxima-font/stylesheet.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      
       var scene = document.getElementById('scene1');
       var parallax = new Parallax(scene);
       
          var scene = document.getElementById('scene2');
       var parallax = new Parallax(scene);
       
          var scene = document.getElementById('dots1');
       var parallax = new Parallax(scene);



  }

}
