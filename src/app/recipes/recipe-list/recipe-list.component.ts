import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output() recipeItem = new EventEmitter<Recipe>();

  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeSubject.subscribe((recipes:Recipe[]) => {
      this.recipes = recipes;
    });
  }

  // onSelected(itemData: Recipe) {
  //   this.recipeItem.emit(itemData);
  // }

  // onSelected(itemData: Recipe) {
  //   this.recipeService.recipeSelected.emit(itemData);
  // }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }
}
