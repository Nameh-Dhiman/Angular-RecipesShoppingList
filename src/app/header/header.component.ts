import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //@Output() LoadFeature: EventEmitter<any> = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  // onSelect(feature:string){
  //   this.LoadFeature.emit(feature);
  // }
}
