import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';

// Interfaces
import { TweetI } from 'src/app/model/tweet.interface';

// Services
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit, OnDestroy {
  public filteredTweets: TweetI[] = [];
  public menuItems: string[] = ['Tweets & replies', 'Tweets', 'Media', 'Likes'];
  private tweets: TweetI[] = [];
  private subscriptions: Subscription[] = [];

  public constructor(private tweetService: TweetService) {}

  public ngOnInit(): void {
    this.getTweets();
    this.filteredTweets = this.filterTweetsAndReplies();
  }

  private getTweets(): void {
    this.subscriptions.push(
      this.tweetService.getMySaved().subscribe((tweetsIds: string[]) => {
        tweetsIds.forEach((id: string) =>
          this.subscriptions.push(
            this.tweetService
              .getTweetById(id)
              .pipe(
                tap((tweet: TweetI) => {
                  this.tweets.push(tweet);
                })
              )
              .subscribe(() =>
                this.tweets.sort(
                  (a: TweetI, b: TweetI) =>
                    Date.parse(b.createdAt.toString()) -
                    Date.parse(a.createdAt.toString())
                )
              )
          )
        );
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

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
