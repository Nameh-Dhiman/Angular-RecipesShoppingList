import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();

  recipeSubject = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Maggi',
      'This is an instant noodles.',
      'https://i0.wp.com/vegecravings.com/wp-content/uploads/2020/01/Street-Style-Maggi-Recipe-Step-By-Step-Instructions-10-scaled.jpg?fit=806%2C730&quality=65&strip=all&ssl=1',
      [
        new Ingredient('Tomatoes', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Green Chillies', 3),
      ]
    ),
    new Recipe(
      'Atta Maggi',
      'This is an instant atta noodles.',
      'https://im.rediff.com/getahead/2020/sep/29burnt-garlic-chilli-maggi.jpg',
      [
        new Ingredient('Tomatoes', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Oregano', 1),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  onAddRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeSubject.next(this.recipes.slice());
  }

  onUpdateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeSubject.next(this.recipes.slice());
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
