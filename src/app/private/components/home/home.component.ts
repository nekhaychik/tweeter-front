import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, switchMap, tap } from 'rxjs';

// Interfaces & constants & enums
import { CreateTweetControls } from 'src/app/model/control.interface';
import { Size } from 'src/app/model/enums';
import { SubscriptionI, User } from 'src/app/model/user.interface';
import { TWEET_TEXT_MAX_LENGTH } from 'src/app/public/constants/constants';

// Services
import { AuthService } from 'src/app/public/services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { TweetService } from '../../services/tweet.service';

interface CommentItemI {
  view: string;
  icon: string;
  value: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public avatarSize: Size = Size.m;
  public textMaxSize: number = TWEET_TEXT_MAX_LENGTH;
  public createTweetForm: FormGroup = new FormGroup({});
  public formControls: typeof CreateTweetControls = CreateTweetControls;
  public authUser!: User;
  public userSubscriptions: string[] = [];
  public commentItems: CommentItemI[] = [
    {
      view: 'Everyone',
      icon: 'public',
      value: true,
    },
    {
      view: 'People you follow',
      icon: 'group',
      value: false,
    },
  ];
  public currentCommentValue: CommentItemI = this.commentItems[0];
  private subscriptionsList: Subscription[] = [];

  public constructor(
    private authService: AuthService,
    private tweetService: TweetService,
    private subscriptionService: SubscriptionService
  ) {}

  public ngOnInit(): void {
    this.createTweetForm.addControl(
      CreateTweetControls.text,
      new FormControl(null, Validators.maxLength(TWEET_TEXT_MAX_LENGTH))
    );

    this.createTweetForm.addControl(
      CreateTweetControls.isComment,
      new FormControl(this.commentItems[0].value, Validators.required)
    );

    this.subscriptionsList.push(
      this.authService.user$
        .pipe(
          tap((user: User | null) => {
            if (user) {
              this.authUser = user;
            }
          }),
          switchMap(() =>
            this.subscriptionService.getAllUserSubscriptions(this.authUser._id)
          )
        )
        .subscribe((subscriptions: SubscriptionI[]) => {
          this.userSubscriptions = subscriptions.map(
            (s: SubscriptionI) => s.userId
          );
        })
    );
  }

  public trackByFn(index: number, item: CommentItemI): number {
    return index;
  }

  public createTweet(): void {
    if (this.createTweetForm.valid) {
      this.subscriptionsList.push(
        this.tweetService
          .createTweet({
            text: this.text.value,
            isComment: this.isComment.value,
          })
          .pipe()
          .subscribe(() => {
            this.createTweetForm.reset({
              isComment: this.commentItems[0].value,
            });
            this.currentCommentValue = this.commentItems[0];
          })
      );
    }
  }

  public commentValue(value: CommentItemI) {
    this.currentCommentValue = value;
    this.setIsCommentControlValue(value.value);
  }

  public get text(): FormControl {
    return this.createTweetForm.get(CreateTweetControls.text) as FormControl;
  }

  public setIsCommentControlValue(value: boolean) {
    this.createTweetForm.get(CreateTweetControls.isComment)?.setValue(value);
  }

  public get isComment(): FormControl {
    return this.createTweetForm.get(
      CreateTweetControls.isComment
    ) as FormControl;
  }

  public ngOnDestroy(): void {
    this.subscriptionsList.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
