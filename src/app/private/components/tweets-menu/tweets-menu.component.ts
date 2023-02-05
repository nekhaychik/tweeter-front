import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tweets-menu',
  templateUrl: './tweets-menu.component.html',
  styleUrls: ['./tweets-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetsMenuComponent {
  public menuItems: string[] = ['Tweets', 'Tweets & replies', 'Media', 'Likes'];

  public trackByFn(index: number, item: string): number {
    return index;
  }
}
