import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Cucumber Sandwich',
  //     'An amazing cucumber sandwich for the summers.',
  //     'https://media.istockphoto.com/photos/english-style-sandwich-picture-id494598811?k=20&m=494598811&s=612x612&w=0&h=AE1hXIxGWQpKZ78Efny77vRHUSZhEPJ4wSuVeLHT9yU=',
  //     [
  //       new Ingredient('Cucumber', 1),
  //       new Ingredient('Bread', 2),
  //       new Ingredient('Mayonnaise', 1),
  //       new Ingredient('Spices', 3),
  //     ]
  //   ),
  //   new Recipe(
  //     'Chicken Burger',
  //     'This is a delicious double patty chicken burger.',
  //     'data:image/jpeg;base64,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',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Lettuce', 1),
  //       new Ingredient('Tomatoes', 2),
  //       new Ingredient('Onions', 2),
  //       new Ingredient('Ketchup', 1),
  //       new Ingredient('Cream', 1),
  //       new Ingredient('Spices', 1),
  //       new Ingredient('Chicken Patty', 2),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shopService: ShoppingListService) {}

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.slice()[id - 1];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
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

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
