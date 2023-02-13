import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Interfaces
import { TweetI } from 'src/app/model/tweet.interface';

// Services
import { TweetService } from '../../services/tweet.service';

interface ButtonSettingsI {
  text: string;
  icon: string;
  disabled: boolean;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit, OnDestroy {
  public tweets: TweetI[] = [];
  public offset: number = 0;
  public limit: number = 5;
  public isAllTweets: boolean = false;
  public buttonsSettings: ButtonSettingsI[] = [
    {
      text: 'Load more...',
      icon: 'keyboard_arrow_down',
      disabled: false,
    },
    {
      text: 'That is all!',
      icon: 'check_circle_outline',
      disabled: true,
    },
  ];
  private subscriptions: Subscription[] = [];

  public constructor(private tweetService: TweetService) {}

  public ngOnInit(): void {
    this.getTweets();
  }

  public getTweets(): void {
    this.subscriptions.push(
      this.tweetService
        .getAllTweets(this.offset, this.limit)
        .subscribe((tweets: TweetI[]) => {
          if (tweets.length > 0) {
            this.tweets.push(...tweets);
            this.offset += this.limit;
          } else {
            this.isAllTweets = true;
          }
        })
    );
  }

  public load(): void {
    if (!this.isAllTweets) this.getTweets();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
