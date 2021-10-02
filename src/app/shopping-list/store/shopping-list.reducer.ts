import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient?: Ingredient;
  editedIngredientIndex?: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  // the index will need to be set with -1, 0 would be an invalid index
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    // you never modify the current state, you have to return a new object
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case ShoppingListActions.ADD_INGREDIENTS:
      const newIngredients = Object.values(
        [...state.ingredients, ...action.payload].reduce(
          (acc, { name, amount }) => {
            acc[name] = {
              name,
              amount: (acc[name] ? acc[name].amount : 0) + amount,
            };
            return acc;
          },
          {}
        )
      );
      return {
        ...state,
        // ingredients: [...state.ingredients, ...action.payload],
        ingredients: newIngredients,
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // usually "ingredient" and "action.payload.ingredient" will have same properties
      // but i.e "ingredient" could have an id property that "action.payload.ingredient" will not have
      // and we dont want to lose it, so we need to include "ingredient" and then overwrite it by action.payload
      const updatedIngredient = { ...ingredient, ...action.payload };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, igIx) => igIx !== state.editedIngredientIndex
        ),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: null,
        editedIngredient: -1,
      };
    default:
      return state;
  }
}
