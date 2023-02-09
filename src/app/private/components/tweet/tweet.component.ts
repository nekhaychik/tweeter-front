import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';

// Interfaces
import { LikeI, TweetI } from 'src/app/model/tweet.interface';
import { User } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth.service';
import { ButtonAppearance, ButtonSize, Size } from '../../../model/enums';
import { TweetService } from '../../services/tweet.service';

// Services
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit, OnDestroy {
  @Input()
  public tweet!: TweetI;
  public amountOfLikes: number = 0;
  public usersLikedTweet: string[] = [];
  public authUser!: User;
  public avatarSize: Size = Size.m;
  public buttonAppearance: ButtonAppearance = ButtonAppearance.mono;
  public buttonSize: ButtonSize = ButtonSize.m;
  public tweetButtons: string[] = ['Comments', 'Reposts', 'Likes', 'Saved'];
  public user!: User;
  private subscriptionList: Subscription[] = [];

  public constructor(
    private userService: UserService,
    private tweetService: TweetService,
    private authService: AuthService
  ) {}

  public ngOnInit() {
    this.subscriptionList.push(
      this.authService.user$.subscribe((user: User | null) => {
        if (user) this.authUser = user;
      })
    );
    this.subscriptionList.push(
      this.userService
        .getUserById(this.tweet.authorId)
        .subscribe((user: User) => (this.user = user))
    );

    this.subscriptionList.push(
      this.tweetService
        .getAmountOfTweetLike(this.tweet._id)
        .pipe(
          tap((amount: number) => (this.amountOfLikes = amount)),
          switchMap(() => this.tweetService.getUsersLikedTweet(this.tweet._id))
        )
        .subscribe((users: string[]) => (this.usersLikedTweet = users))
    );
  }

  public trackByFn(index: number, item: string): number {
    return index;
  }

  public get dateString(): string {
    return new Date(this.tweet.createdAt).toLocaleString();
  }

  public handleClick(value: string) {
    switch (value) {
      case this.tweetButtons[0]:
        this.repost();
        break;
      case this.tweetButtons[1]:
        this.repost();
        break;
      case this.tweetButtons[2]:
        this.like();
        break;
      case this.tweetButtons[3]:
        this.repost();
        break;
    }
  }

  public repost(): void {
    this.subscriptionList.push(
      this.tweetService.repostTweet(this.tweet._id).subscribe()
    );
  }

  public likeHandler(): void {
    if (this.usersLikedTweet.includes(this.authUser._id)) {
      this.unlike();
    } else {
      this.like();
    }
  }

  private like(): void {
    this.subscriptionList.push(
      this.tweetService.likeTweet(this.tweet._id).subscribe((like: LikeI) => {
        this.amountOfLikes++;
        this.usersLikedTweet.push(this.authUser._id);
      })
    );
  }

  private unlike(): void {
    this.subscriptionList.push(
      this.tweetService.unlike(this.tweet._id).subscribe(() => {
        this.amountOfLikes--;
        const index: number = this.usersLikedTweet.indexOf(this.authUser._id);
        this.usersLikedTweet.splice(index, 1);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionList.forEach((s: Subscription) => s.unsubscribe());
  }
}
