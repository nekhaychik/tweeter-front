import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';

// Interfaces
import { SubscriptionI, User } from 'src/app/model/user.interface';
import { Size } from '../../../model/enums';

// Services
import { AuthService } from 'src/app/public/services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { UserService } from '../../services/user.service';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public user: User | null = null;
  public authUser!: User;
  public avatarSize: Size = Size.xxl;
  public buttonFollowText: string = 'Follow';
  public buttonFollowedText: string = 'Followed';
  public bottonFollowedIcon: string = 'check';
  public followers: string[] = [];
  public following: string[] = [];
  private subscriptions: Subscription[] = [];

  public constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private tweetService: TweetService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((user: User | null) => {
        if (user) this.authUser = user;
      })
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

  public followUserHandler() {
    if (this.user)
      this.subscriptions.push(
        this.subscriptionService
          .subscribe(this.user._id)
          .subscribe(() => this.followers.push(this.authUser._id))
      );
  }

  public unfollowUserHandler() {
    if (this.user)
      this.subscriptions.push(
        this.subscriptionService.unsubscribe(this.user._id).subscribe(() => {
          const index: number = this.followers.indexOf(this.authUser._id);
          this.followers.splice(index, 1);
        })
      );
  }

  public getFollowers(id: string): void {
    this.followers = [];
    this.subscriptionService
      .getAllUserSubscribers(id)
      .subscribe((followers: SubscriptionI[]) => {
        followers.forEach((follower: SubscriptionI) =>
          this.followers.push(follower.subscriberId)
        );
      });
  }

  public getFollowing(id: string): void {
    this.following = [];
    this.subscriptions.push(
      this.subscriptionService
        .getAllUserSubscriptions(id)
        .subscribe((following: SubscriptionI[]) => {
          following.forEach((following) =>
            this.following.push(following.userId)
          );
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
