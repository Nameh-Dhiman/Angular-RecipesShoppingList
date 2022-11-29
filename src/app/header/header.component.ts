import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //@Output() LoadFeature: EventEmitter<any> = new EventEmitter<string>();
  private subscription:Subscription;
  isAuthenticated:boolean = false;
  
  constructor(private route:ActivatedRoute, private router: Router, private dataService:DataStorageService, private authService:AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
    this.dataService.storeRecipes();
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }

  logout(){
    this.authService.onLogout();
  }

  // onSelect(feature:string){
  //   this.LoadFeature.emit(feature);
  // }

  ngOnDestroy(): void {
    
  }
}
