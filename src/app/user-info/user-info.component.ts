import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Size } from '../private/enums/enums';
import { SubscriptionI, User } from '../model/user.interface';
import { AuthService } from '../public/services/auth-service/auth.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  public avatarSize: Size = Size.xxl;
  public buttonFollowText: string = 'Follow';

  public user: User | null = null;
  public isAuthUser!: boolean;

  public followersCount: number = 0;
  public followingCount: number = 0;

  public constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.getUser(params['id']);
        this.isAuthUser = false;
      } else {
        this.getAuthUser();
        this.isAuthUser = true;
      }
    });
    // this.subscriptionService.getAllUserSubscriptions().subscribe;
  }

  public getUser(id: string): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  public getAuthUser(): void {
    this.authService.user$.subscribe((user: User | null) => (this.user = user));
  }

  public getFollowers(id: string): void {
    this.subscriptionService
      .getAllUserSubscribers(id)
      .subscribe(
        (followers: SubscriptionI[]) => (this.followersCount = followers.length)
      );
  }
}
