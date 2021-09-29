import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

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
  constructor() {}

  setRecipes(recipes: Recipe[]) {
    console.log(recipes);
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
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
