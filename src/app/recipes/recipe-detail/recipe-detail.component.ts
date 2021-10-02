import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;
  id: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Se queda escuchando (subscribe) si hay cambios en el id de la url, en el momento que se clicke una receta,
    // habrá un cambio en el id de la url y se ejecutará este callback
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.currentRecipe = this.recipeService.getRecipe(this.id);
    });
  }

  addIngredientsToSL() {
    this.recipeService.addIngredientsToShoppingList(
      this.currentRecipe.ingredients
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
