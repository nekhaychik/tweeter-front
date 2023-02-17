import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Interfaces & enums
import { HeaderTab } from 'src/app/model/common.interface';
import { User } from 'src/app/model/user.interface';
import { Route } from '../../../model/enums';

// Services
import { AuthService } from 'src/app/public/services/auth.service';

interface MenuButtonsI {
  icon: string;
  buttonText: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  public user: User | null = null;
  public tabs: HeaderTab[] = [
    {
      name: 'Home',
      route: Route.home,
    },
    {
      name: 'Explore',
      route: '../private/explore',
    },
    {
      name: 'Bookmarks',
      route: Route.bookmarks,
    },
  ];
  public menuBattons: MenuButtonsI[] = [
    {
      icon: 'person',
      buttonText: 'My Profile',
    },
    {
      icon: 'group',
      buttonText: 'Group Chat',
    },
    {
      icon: 'settings',
      buttonText: 'Settings',
    },
    {
      icon: 'exit_to_app',
      buttonText: 'Log Out',
    },
  ];
  public activeTab: string = '';
  private subscriptions: Subscription[] = [];

  public constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.tabs.forEach((tab: HeaderTab) => {
      if (
        this.router.url.includes(
          tab.route.split('/')[tab.route.split('/').length - 1]
        )
      )
        this.activeTab = tab.name;
    });
  }

  public trackByFn(index: number, item: HeaderTab | MenuButtonsI): number {
    return index;
  }

  public clickTabHandler(route: string): void {
    this.router.navigate([route]);
  }

  public clickMenuHandler(name: string): void {
    switch (name) {
      case this.menuBattons[0].buttonText:
        this.navigateToMyPage();
        break;
      case this.menuBattons[3].buttonText:
        this.logOut();
        break;
    }
  }

  private navigateToMyPage(): void {
    this.router.navigate([Route.userPage + `/${this.user?._id}`]);
  }

  private logOut(): void {
    this.subscriptions.push(
      this.authService.signOut().subscribe(() => {
        this.authService.user$.next(null);
        this.router.navigate(['/']);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
