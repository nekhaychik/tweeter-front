import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

// Interfaces & enums
import { TweetI } from 'src/app/model/tweet.interface';
import { User } from 'src/app/model/user.interface';
import {
  ButtonAppearance,
  ButtonSize,
  Route,
  Size,
} from '../../../model/enums';

// Services
import { UserService } from '../../services/user.service';
import { TweetService } from '../../services/tweet.service';
import { AuthService } from 'src/app/public/services/auth.service';

interface ButtonI {
  active: string;
  unactive: string;
  icon: string;
}

export interface Tile {
  src: any;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public tweet!: TweetI;
  public usersLikedTweet: string[] = [];
  public usersSavedTweet: string[] = [];
  public usersRepostedTweet: string[] = [];
  public authUser!: User;
  public avatarSize: Size = Size.m;
  public buttonAppearance: ButtonAppearance = ButtonAppearance.mono;
  public buttonSize: ButtonSize = ButtonSize.m;
  public activeButtonLikeStyle: string = 'color: #EB5757;';
  public activeButtonSaveStyle: string = 'color: #2D9CDB;';
  public activeButtonRepostStyle: string = 'color: #27AE60;';
  public unactiveButton: string = 'color: #4F4F4F;';
  public user!: User;
  public recordParentAuthor: User | null = null;
  public routes: typeof Route = Route;
  private subscriptionList: Subscription[] = [];
  public buttonNames: ButtonI[] = [
    {
      active: 'Comment',
      unactive: 'Comment',
      icon: 'chat_bubble_outline',
    },
    {
      active: 'Retweeted',
      unactive: 'Retweet',
      icon: 'loop',
    },
    {
      active: 'Liked',
      unactive: 'Like',
      icon: 'thumb_up_alt',
    },
    {
      active: 'Saved',
      unactive: 'Save',
      icon: 'turned_in_not',
    },
  ];

  public imagesToShow: any[] = [];
  // public gridRowHeight: number = 0;
  public cols: number = 0;

  public constructor(
    private userService: UserService,
    private tweetService: TweetService,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      Array.isArray(this.tweet.imagesURLs) &&
      this.tweet.imagesURLs.length > 0
    ) {
      console.log(this.tweet.imagesURLs)
      this.tweet.imagesURLs.forEach((filename: string, index: number) => {
        this.subscriptionList.push(
          this.tweetService
            .getImage(filename)
            .pipe(tap((image: Blob) => this.createImageFromBlob(image)))
            .subscribe(() => {})
        );
      });
    }
  }

  public ngOnInit(): void {
    this.subscriptionList.push(
      this.authService.user$.subscribe((user: User | null) => {
        if (user) this.authUser = user;
      })
    );

    this.subscriptionList.push(
      this.userService
        .getUserById(this.tweet.authorId)
        .subscribe((user: User) => {
          if (user) this.user = user;
        })
    );

    this.subscriptionList.push(
      this.tweetService
        .getUsersLikedTweet(this.tweet._id)
        .subscribe((users: string[]) => (this.usersLikedTweet = users))
    );

    this.subscriptionList.push(
      this.tweetService
        .getUsersRepostedTweet(this.tweet._id)
        .subscribe((users: string[]) => (this.usersRepostedTweet = users))
    );

    this.subscriptionList.push(
      this.tweetService
        .getUsersSavedTweet(this.tweet._id)
        .subscribe((users: string[]) => (this.usersSavedTweet = users))
    );

    if (this.tweet.parentRecordAuthorId) {
      this.subscriptionList.push(
        this.userService
          .getUserById(this.tweet.parentRecordAuthorId)
          .pipe(tap((user: User) => (this.recordParentAuthor = user)))
          .subscribe()
      );
    }
  }

  private createImageFromBlob(image: Blob): void {
    let reader: FileReader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imagesToShow.push(reader.result);
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public navigateToUserPage(): void {
    this.router.navigate([
      `${this.routes.userPage}/${
        this.recordParentAuthor?._id
          ? this.recordParentAuthor._id
          : this.user._id
      }`,
    ]);
  }

  public trackByFn(index: number, item: string): number {
    return index;
  }

  public get gridCols(): number {
    if (this.imagesToShow.length === 1) {
      return 1;
    } else {
      return this.imagesToShow.length % 2 ? 3 : 2;
    }
  }

  public get gridRowHeight(): number {
    if (this.imagesToShow.length < 4) return 375;
    if (this.imagesToShow.length < 7) return 375 / 2;
    else return 375 / 3;
  }

  public get tweetUserName(): string {
    if (this.tweet.parentRecordAuthorId) {
    }
    return this.recordParentAuthor?.username
      ? this.recordParentAuthor.username
      : this.user.username;
  }

  public get dateString(): string {
    return new Date(this.tweet.createdAt).toLocaleString();
  }

  public addStyle(arr: string[], activeStyle: string): string {
    return arr.includes(this.authUser._id) ? activeStyle : this.unactiveButton;
  }

  public ceil(number: number) {
    return Math.ceil(number);
  }

  public repost(): void {
    if (
      !this.usersRepostedTweet.includes(this.authUser._id) &&
      this.tweet.authorId !== this.authUser._id
    ) {
      let repostedTweetId: string = this.tweet._id;
      if (this.tweet.parentRecordId)
        repostedTweetId = this.tweet.parentRecordId;
      this.subscriptionList.push(
        this.tweetService
          .repostTweet(repostedTweetId)
          .subscribe(() => this.usersRepostedTweet.push(this.authUser._id))
      );
    }
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
      this.tweetService.likeTweet(this.tweet._id).subscribe(() => {
        this.usersLikedTweet.push(this.authUser._id);
      })
    );
  }

  private unlike(): void {
    this.subscriptionList.push(
      this.tweetService.unlike(this.tweet._id).subscribe(() => {
        const index: number = this.usersLikedTweet.indexOf(this.authUser._id);
        this.usersLikedTweet.splice(index, 1);
      })
    );
  }

  public saveHandler(): void {
    if (this.usersSavedTweet.includes(this.authUser._id)) {
      this.unsave();
    } else {
      this.save();
    }
  }

  private save(): void {
    this.subscriptionList.push(
      this.tweetService
        .saveTweet(this.tweet._id)
        .subscribe(() => this.usersSavedTweet.push(this.authUser._id))
    );
  }

  private unsave(): void {
    this.subscriptionList.push(
      this.tweetService.unsave(this.tweet._id).subscribe(() => {
        const index: number = this.usersLikedTweet.indexOf(this.authUser._id);
        this.usersSavedTweet.splice(index, 1);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionList.forEach((s: Subscription) => s.unsubscribe());
  }
}
