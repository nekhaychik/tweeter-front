import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';

// Interfaces
import { SubscriptionI, User } from 'src/app/model/user.interface';
import { Size } from '../../enums/enums';

// Services
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input()
  public user: User | null = null;
  public isAuthUser: boolean = false;
  public avatarSize: Size = Size.xxl;
  public buttonFollowText: string = 'Follow';
  public followersCount: number = 11;
  public followingCount: number = 11;
  private subscriptions: Subscription[] = [];

  public constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.isAuthUserPage().subscribe(
        (isAuth: boolean) => (this.isAuthUser = isAuth)
      )
    );
  }

  public ngOnChanges(): void {
    if (this.user) {
      this.getFollowers(this.user._id);
      this.getFollowing(this.user._id);
    }
  }

  public isAuthUserPage(): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user: User | null) => {
        return user?._id === this.user?._id;
      })
    );
  }

  public routeToMyPage(): void {
    this.authService.user$.pipe(
      tap((user: User | null) => {
        if (user) {
          this.router.navigate([`./private/${user._id}`]);
        }
      })
    );
  }

  public getFollowers(id: string): void {
    this.subscriptionService
      .getAllUserSubscribers(id)
      .subscribe(
        (followers: SubscriptionI[]) => (this.followersCount = followers.length)
      );
  }

  public getFollowing(id: string): void {
    this.subscriptions.push(
      this.subscriptionService
        .getAllUserSubscriptions(id)
        .subscribe(
          (following: SubscriptionI[]) =>
            (this.followingCount = following.length)
        )
    );
  }
}
