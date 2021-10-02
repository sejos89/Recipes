import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe(
    //   'A Test Recipe',
    //   'This is simply a test',
    //   'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
    //   [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    // ),
    // new Recipe(
    //   'Spaguetti Carbonara',
    //   'The original recipe of this italian dish',
    //   'https://www.pequerecetas.com/wp-content/uploads/2010/10/espaguetis-carbonara1.jpg',
    //   [
    //     new Ingredient('Spaguetti', 200),
    //     new Ingredient('Cooking cream', 1),
    //     new Ingredient('Bacon', 10),
    //   ]
    // ),
    // new Recipe(
    //   'Cachopo',
    //   'This is the best steak',
    //   'https://www.recetasderechupete.com/wp-content/uploads/2017/11/Cachopo.jpg?width=1200&enable=upscale',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Ham', 20),
    //     new Ingredient('Cheese', 100),
    //   ]
    // ),
  ];
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  setRecipes(recipes: Recipe[]) {
    console.log(recipes);
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipes() {
    // we use .slice() to generate a new array and avoid to edit the original array
    return this.recipes.slice(); // an alternative would be spread operator "return [...this.recipes]";
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
