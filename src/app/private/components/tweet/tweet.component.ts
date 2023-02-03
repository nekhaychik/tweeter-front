import { Component, OnInit } from '@angular/core';
import { ButtonAppearance, ButtonSize, Size } from '../../enums/enums';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  avatarSize = Size.m;
  buttonAppearance = ButtonAppearance.mono;
  buttonSize = ButtonSize.m;
  tweetButtons = ['Comments', 'Retweets', 'Likes', 'Saved'];

  constructor() {}

  ngOnInit() {}
}
