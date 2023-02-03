import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guard
import { AuthGuard } from './guards/auth.guard';

// Components
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'private',
    canActivate: [AuthGuard],
    component: MainComponent,
    // loadChildren: () =>
    //   import('./private/private.module').then((m) => m.PrivateModule),
  },
  {
    path: 'private/:id',
    canActivate: [AuthGuard],
    component: MainComponent,
    // loadChildren: () =>
    //   import('./private/private.module').then((m) => m.PrivateModule),
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
