import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeItem = new EventEmitter<Recipe>();

  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // onSelected(itemData: Recipe) {
  //   this.recipeItem.emit(itemData);
  // }

  // onSelected(itemData: Recipe) {
  //   this.recipeService.recipeSelected.emit(itemData);
  // }
}
