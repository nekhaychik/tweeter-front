import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ExploreComponent } from './components/explore/explore.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      {
        path: 'user-page/:id',
        component: MainComponent,
      },
      { path: 'home', component: HomeComponent },
      {
        path: 'explore',
        component: ExploreComponent,
      },
      {
        path: 'bookmarks',
        component: BookmarksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
