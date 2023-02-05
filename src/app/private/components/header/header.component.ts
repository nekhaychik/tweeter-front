import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

// Interfaces
import { HeaderTab } from 'src/app/model/common.interface';
import { User } from 'src/app/model/user.interface';
import { Route } from '../../enums/enums';

// Services
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
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
  private subscriptionsList: Subscription[] = [];

  public constructor(private router: Router, public authService: AuthService) {}

  public ngOnInit(): void {
    this.subscriptionsList.push(
      this.authService.user$.subscribe(
        (user: User | null) => (this.user = user)
      )
    );
  }

  public onClick(route: string): void {
    this.router.navigate([route]);
  }

  public ngOnDestroy(): void {
    this.subscriptionsList.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
