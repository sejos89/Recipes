import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({ providedIn: 'root' })
// Los resolver se ejecutan al principio, en este caso lo usamos para que al refrescar la página, se traiga los datos de Firebase,
// asi evitamos errores de que busca un detalle o un edit de un recipe que no existe
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  // We don't need to subscribe because resolver will do it for us
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map(({ recipes }): Recipe[] => recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          // in this way the resolver will not finish until the SET_RECIPES action is called and we
          // assure we already have fetched the recipes
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of([]);
        }
      })
    );
  }
}
