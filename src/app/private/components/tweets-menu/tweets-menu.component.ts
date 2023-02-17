import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tweets-menu',
  templateUrl: './tweets-menu.component.html',
  styleUrls: ['./tweets-menu.component.css'],
})
export class TweetsMenuComponent implements OnInit {
  @Output()
  public menuEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public menuItems: string[] = [];
  public activeTab: string = '';

  public ngOnInit(): void {
    this.activeTab = String(this.menuItems[2]);
  }

  public trackByFn(index: number, item: string): number {
    return index;
  }
}
