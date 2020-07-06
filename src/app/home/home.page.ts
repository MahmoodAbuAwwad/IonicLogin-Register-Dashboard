import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 

  Login:boolean;
  validForm:boolean;
  constructor() {}
  ngOnInit(): void {
    this.Login=true;
    this.validForm=true;
  }
  
  onSubmit(form:NgForm){
  
  }

}
