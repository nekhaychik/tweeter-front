import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivateRoutingModule } from './private-routing.module';

// Components
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MainComponent } from './components/main/main.component';
import { ButtonComponent } from './components/button/button.component';
import { TweetsMenuComponent } from './components/tweets-menu/tweets-menu.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { TweetsNewsComponent } from './components/tweets-news/tweets-news.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';

import {
  TuiAvatarModule,
  TuiTabsModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    AvatarComponent,
    MainComponent,
    UserInfoComponent,
    ButtonComponent,
    TweetsMenuComponent,
    TweetsNewsComponent,
    TweetComponent,
    UserPageComponent,
    HomeComponent,
    ExploreComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    TuiAvatarModule,
    TuiDialogModule,
    TuiTabsModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiSvgModule,
    TuiButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TuiTextAreaModule,
    MatGridListModule,
  ],
})
export class PrivateModule {}
