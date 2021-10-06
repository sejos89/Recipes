import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.action$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() =>
        this.http.get<Recipe[]>(
          'https://recipe-book-27a65-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        )
      ),
      map((recipes) =>
        recipes.map((recipe) =>
          recipe.ingredients ? recipe : { ...recipe, ingredients: [] }
        )
      ),
      map((recipes) => new RecipesActions.SetRecipes(recipes))
    )
  );

  storeRecipes = createEffect(
    () =>
      this.action$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        // withLatestFrom allows us to merge the value of an observable into another observable
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            'https://recipe-book-27a65-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
