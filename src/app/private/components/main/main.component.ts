import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';

// Interfaces
import { User } from 'src/app/model/user.interface';
import { TweetI } from 'src/app/model/tweet.interface';

// Services
import { AuthService } from 'src/app/public/services/auth.service';
import { TweetService } from '../../services/tweet.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  public menuItems: string[] = ['Tweets & replies', 'Tweets', 'Media', 'Likes'];
  public filteredTweets: TweetI[] = [];
  private tweets: TweetI[] = [];
  private subscriptionsList: Subscription[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private tweetService: TweetService
  ) {}

  public ngOnInit(): void {
    this.subscriptionsList.push(
      this.route.params.subscribe((params: Params) => {
        const id: string = params['id'];
        if (!id) {
          this.subscriptionsList.push(
            this.authService.user$.subscribe((user: User | null) => {
              if (user) {
                this.user = user;
                this.router.navigate([`./private/user-page/${this.user._id}`]);
              }
            })
          );
        } else {
          this.subscriptionsList.push(
            this.userService
              .getUserById(id)
              .pipe(
                tap((user: User) => (this.user = user)),
                switchMap((user: User) =>
                  this.tweetService.getAllUserTweetsWithLikes(user._id)
                )
              )
              .subscribe((tweets: TweetI[]) => {
                this.tweets = tweets.sort(
                  (a: TweetI, b: TweetI) =>
                    Date.parse(b.createdAt.toString()) -
                    Date.parse(a.createdAt.toString())
                );
                this.filteredTweets = this.filterTweetsAndReplies();
              })
          );
        }
      })
    );
  }

  public filter(filterBy: string): void {
    switch (filterBy) {
      case this.menuItems[0]:
        this.filteredTweets = this.filterTweetsAndReplies();
        break;
      case this.menuItems[1]:
        this.filteredTweets = this.filterTweets();
        break;
      case this.menuItems[2]:
        this.filteredTweets = this.filterMedia();
        break;
      case this.menuItems[3]:
        console.log(this.tweets);
        this.filteredTweets = this.filterLikes();
        break;
    }
  }

  private filterTweets(): TweetI[] {
    return this.tweets
      .filter((tweet: TweetI) => tweet.parentRecordId === null)
      .sort(
        (a: TweetI, b: TweetI) =>
          Date.parse(b.createdAt.toString()) -
          Date.parse(a.createdAt.toString())
      );
  }

  private filterTweetsAndReplies(): TweetI[] {
    return this.tweets.sort(
      (a: TweetI, b: TweetI) =>
        Date.parse(b.createdAt.toString()) - Date.parse(a.createdAt.toString())
    );
  }

  private filterMedia(): TweetI[] {
    return this.tweets
      .filter((tweet: TweetI) => tweet.imagesURLs?.length !== 0)
      .sort(
        (a: TweetI, b: TweetI) =>
          Date.parse(b.createdAt.toString()) -
          Date.parse(a.createdAt.toString())
      );
  }

  private filterLikes(): TweetI[] {
    return this.tweets.sort(
      (a: TweetI, b: TweetI) =>
        (b.amountOfLikes ? b.amountOfLikes : 0) -
        (a.amountOfLikes ? a.amountOfLikes : 0)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionsList.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
