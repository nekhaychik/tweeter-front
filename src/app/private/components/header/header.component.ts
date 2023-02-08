import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

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
export class HeaderComponent {
  @Input()
  public user: User | null = null;
  public readonly tabs: HeaderTab[] = [
    {
      name: 'Home',
      route: Route.home,
    },
    {
      name: 'Explore',
      route: Route.userPage, // change
    },
    {
      name: 'Bookmarks',
      route: '', // change
    },
  ];
  public activeTab: string = this.tabs[1].name;

  public constructor(private router: Router, public authService: AuthService) {}

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
