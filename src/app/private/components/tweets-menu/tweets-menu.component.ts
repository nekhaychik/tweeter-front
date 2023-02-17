import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tweets-menu',
  templateUrl: './tweets-menu.component.html',
  styleUrls: ['./tweets-menu.component.css'],
})
export class TweetsMenuComponent implements OnInit {
  @Output()
  public menuEvent: EventEmitter<string> = new EventEmitter<string>();
  public menuItems: string[] = ['Tweets & replies', 'Tweets', 'Media', 'Likes'];
  public activeTab: string = '';

  public ngOnInit(): void {
    this.activeTab = String(this.menuItems[2]);
  }
}
