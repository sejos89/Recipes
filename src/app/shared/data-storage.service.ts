import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as fromRecipes from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-27a65-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) =>
          recipes.map((recipe) =>
            recipe.ingredients ? recipe : { ...recipe, ingredients: [] }
          )
        ),
        tap((recipes) =>
          this.store.dispatch(new fromRecipes.SetRecipes(recipes))
        )
      );
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://recipe-book-27a65-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }
}
