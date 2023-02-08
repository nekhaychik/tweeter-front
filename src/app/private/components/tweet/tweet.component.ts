import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Interfaces
import { TweetI } from 'src/app/model/tweet.interface';
import { User } from 'src/app/model/user.interface';
import { ButtonAppearance, ButtonSize, Size } from '../../../model/enums';

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
  public avatarSize: Size = Size.m;
  public buttonAppearance: ButtonAppearance = ButtonAppearance.mono;
  public buttonSize: ButtonSize = ButtonSize.m;
  public tweetButtons: string[] = ['Comments', 'Retweets', 'Likes', 'Saved'];
  public user!: User;
  private subscriptionList: Subscription[] = [];

  public constructor(private userService: UserService) {}

  public ngOnInit() {
    this.subscriptionList.push(
      this.userService
        .getUserById(this.tweet.authorId)
        .subscribe((user: User) => (this.user = user))
    );
  }

  public trackByFn(index: number, item: string): number {
    return index;
  }

  public ngOnDestroy(): void {
    this.subscriptionList.forEach((s: Subscription) => s.unsubscribe());
  }
}
