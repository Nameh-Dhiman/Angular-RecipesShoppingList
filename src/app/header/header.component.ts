import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //@Output() LoadFeature: EventEmitter<any> = new EventEmitter<string>();


  constructor(private route:ActivatedRoute, private router: Router, private dataService:DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData(){
    this.dataService.storeRecipes();
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }

  // onSelect(feature:string){
  //   this.LoadFeature.emit(feature);
  // }
}
