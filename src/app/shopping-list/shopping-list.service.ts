import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

// Si pones esto, no hace falta añadir el service al app module
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients)

    this.ingredients = Object.values(
      [...this.ingredients, ...ingredients].reduce((acc, { name, amount }) => {
        acc[name] = {
          name,
          amount: (acc[name] ? acc[name].amount : 0) + amount,
        };
        return acc;
      }, {})
    );
    // Si no hacemos el "ingredientsChanged.emit", funcionaría igual porque tenemos recipes y shopping list en diferentes layouts, por lo que cuando
    // llamamos al shopping list, en el ngOnInit se llama a getIngredients() y se actualiza la lista, pero si quisiésemos tener en el mismo layout recipes y
    // shopping list, tendríamos que hacer el .emit para que se actualice la lista
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
