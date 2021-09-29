import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
// Los resolver se ejecutan al principio, en este caso lo usamos para que al refrescar la página, se traiga los datos de Firebase,
// asi evitamos errores de que busca un detalle o un edit de un recipe que no existe
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  // We don't need to subscribe because resolver will do it for us
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    console.log('hola desde el resolver!');
    if (!recipes.length) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
