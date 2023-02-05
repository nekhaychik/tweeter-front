import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { SvgImageComponent } from './components/svg-image/svg-image.component';
import { MainComponent } from './components/main/main.component';
import { ButtonComponent } from './components/button/button.component';
import { TweetsMenuComponent } from './components/tweets-menu/tweets-menu.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { TweetsNewsComponent } from './components/tweets-news/tweets-news.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { TuiAvatarModule, TuiTabsModule } from '@taiga-ui/kit';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiRootModule,
  TuiSvgModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    AvatarComponent,
    SvgImageComponent,
    MainComponent,
    UserInfoComponent,
    ButtonComponent,
    TweetsMenuComponent,
    TweetsNewsComponent,
    TweetComponent,
    UserPageComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    TuiAvatarModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiTabsModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiSvgModule,
    TuiButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class PrivateModule {}
