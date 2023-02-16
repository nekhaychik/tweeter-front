import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchControls } from 'src/app/model/control.interface';

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
  public searchForm: FormGroup = new FormGroup({});
  public formControls: typeof SearchControls = SearchControls;
  public isSearch: boolean = false;
  public searchTweets: TweetI[] = [];
  public searchOffset: number = 0;
  public searchLimit: number = 5;
  public isAllSearchTweets: boolean = false;
  private subscriptions: Subscription[] = [];

  public constructor(private tweetService: TweetService) {}

  public ngOnInit(): void {
    this.getTweets();

    this.searchForm.addControl(
      SearchControls.search,
      new FormControl(null, Validators.compose([Validators.required]))
    );
  }

  public getTweets(): void {
    this.subscriptions.push(
      this.tweetService
        .getAllTweets(this.offset, this.limit)
        .subscribe((tweets: TweetI[]) => {
          if (tweets.length > 0) {
            this.tweets.push(...tweets);
            this.offset += this.limit;
            if (tweets.length < 5) this.isAllTweets = true;
          } else {
            this.isAllTweets = true;
          }
        })
    );
  }

  public searchHandler(): void {
    if (this.searchForm.valid) {
      this.subscriptions.push(
        this.tweetService
          .getAllTweets(this.searchOffset, this.searchLimit, this.search.value)
          .subscribe((tweets: TweetI[]) => {
            this.isSearch = true;
            if (tweets.length > 0) {
              this.searchTweets.push(...tweets);
              this.searchOffset += this.searchLimit;
            } else {
              this.isAllSearchTweets = true;
            }
          })
      );
    }
  }

  public load(): void {
    if (!this.isAllTweets) this.getTweets();
  }

  public get search(): FormControl {
    return this.searchForm.get(SearchControls.search) as FormControl;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
