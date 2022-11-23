import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id:number;
  editMode:boolean;
  paramSubscription:Subscription;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params:Params) => {
      this.id = +params.id;
      this.editMode = params['id']!=null;
      console.log(this.editMode);
    })
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
