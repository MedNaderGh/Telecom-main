import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'partenaires', loadChildren: './pages/partenaires/partenaires.module#PartenairesPageModule' },
  { path: 'promo', loadChildren: './pages/promo/promo.module#PromoPageModule' },
  { path: 'recherche', loadChildren: './pages/recherche/recherche.module#RecherchePageModule' },
  { path: 'tracabilite', loadChildren: './pages/tracabilite/tracabilite.module#TracabilitePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
