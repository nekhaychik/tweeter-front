import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiTabsModule } from '@taiga-ui/kit';
import { TuiHostedDropdownModule } from '@taiga-ui/core';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SvgImageComponent } from './svg-image/svg-image.component';
import { MainComponent } from './main/main.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ButtonComponent } from './button/button.component';
import { TweetsMenuComponent } from './tweets-menu/tweets-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    AvatarComponent,
    SvgImageComponent,
    MainComponent,
    UserInfoComponent,
    ButtonComponent,
    TweetsMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiAvatarModule,
    TuiTabsModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiSvgModule,
    TuiButtonModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
