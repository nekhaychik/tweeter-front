import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

// Interfaces
import { TweetI } from 'src/app/model/tweet.interface';

// Services
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-tweets-news',
  templateUrl: './tweets-news.component.html',
  styleUrls: ['./tweets-news.component.css'],
})
export class TweetsNewsComponent implements OnChanges, OnDestroy {
  @Input()
  public usersIds: string[] = [];
  @Input()
  public tweets: TweetI[] = [];
  @Output()
  public likeEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public unlikeEvent: EventEmitter<string> = new EventEmitter<string>();
  private subscriptionList: Subscription[] = [];

  public constructor(private tweetService: TweetService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.usersIds.length > 0) {
      this.tweets = [];
      this.usersIds.forEach((userId: string) => {
        this.subscriptionList.push(
          this.tweetService
            .getAllUserTweets(userId)
            .subscribe((tweets: TweetI[]) => {
              this.tweets.push(...tweets);
              if (this.tweets.length > 1) {
                this.tweets.sort(
                  (a: TweetI, b: TweetI) =>
                    Date.parse(b.createdAt.toString()) -
                    Date.parse(a.createdAt.toString())
                );
              }
            })
        );
      });
    }
  }

  public removeTweetFromList(tweetId: string): void {
    const index: number = this.tweets
      .map((tweet: TweetI) => tweet._id)
      .indexOf(tweetId);
    if (typeof index === 'number') this.tweets.splice(index, 1);
  }

  public ngOnDestroy(): void {
    this.subscriptionList.forEach((s: Subscription) => s.unsubscribe());
  }
}
