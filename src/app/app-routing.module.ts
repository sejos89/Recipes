import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
];

@NgModule({
  imports: [
    // Adding preloadAllModules we can take advantage of the lazy loading, because we are not loading the modules (but preloading)
    // and we can have the bundles ready to be used, so it will load faster the modules when we need them
    // Adding preloadAllModules we can take advantage of the lazy loading, because we are not loading the modules (but preloading)
// and we can have the bundles ready to be used, so it will load faster the modules when we need them
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
