import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Subscription, User } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { Size } from '../../enums/enums';
import { SubscriptionService } from '../../services/subscription.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  public avatarSize: Size = Size.xxl;
  public buttonFollowText: string = 'Follow';

  @Input()
  public user: User | null = null;
  public isAuthUser!: boolean;

  public followersCount: number = 0;
  public followingCount: number = 0;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}

  public getUser(id: string): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  public routeToMyPage(): void {
    this.authService.user$.pipe(
      tap((user) => {
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
        (followers: Subscription[]) => (this.followersCount = followers.length)
      );
  }
}
