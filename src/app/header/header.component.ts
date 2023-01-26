import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tuiIsString } from '@taiga-ui/cdk';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public user = { name: 'User;' }
  readonly collaborators = [`Carol Cleveland`, `Neil Innes`];

  readonly tabs: string[] = [
    'Home',
    'Explore',
    'Bookmarks',
  ];


  activeElement = String(this.tabs[0]);

  get activeItemIndex(): number {
    return this.tabs.indexOf(this.activeElement);
  }

  onClick(activeElement: string): void {
    this.activeElement = activeElement;
  }
}
