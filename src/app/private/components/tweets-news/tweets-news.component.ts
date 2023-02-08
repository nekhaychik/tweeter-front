import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';

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
  public tweets: TweetI[] = [];
  private subscriptionList: Subscription[] = [];

  public constructor(private tweetService: TweetService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.usersIds.length > 0) {
      this.usersIds.forEach((userId: string) => {
        this.subscriptionList.push(
          this.tweetService
            .getAllUserTweets(userId)
            .subscribe((tweets: TweetI[]) => this.tweets.push(...tweets))
        );
      });
    }
  }

  public trackByFn(index: number, item: TweetI): number {
    return index;
  }

  public get sortedTweets(): TweetI[] {
    return this.tweets.sort(
      (a: TweetI, b: TweetI) => +a.createdAt - +b.createdAt
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionList.forEach((s: Subscription) => s.unsubscribe());
  }
}
