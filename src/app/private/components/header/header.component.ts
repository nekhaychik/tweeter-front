import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

// Interfaces
import { HeaderTab } from 'src/app/model/common.interface';
import { User } from 'src/app/model/user.interface';
import { Route } from '../../../model/enums';

// Services
import { AuthService } from 'src/app/public/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input()
  public user: User | null = null;
  public readonly tabs: HeaderTab[] = [
    {
      name: 'Home',
      route: Route.home,
    },
    {
      name: 'Explore',
      route: Route.userPage,
    },
    {
      name: 'Bookmarks',
      route: '/book', // change
    },
  ];
  public activeTab: string = '';

  public constructor(private router: Router, public authService: AuthService) {}

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

  public trackByFn(index: number, item: HeaderTab): number {
    return index;
  }

  public onClick(route: string): void {
    this.router.navigate([route]);
  }

  public logOut() {
    this.authService.signOut().subscribe(() => {
      this.authService.user$.next(null);
      this.router.navigate(['/']);
    });
  }
}
