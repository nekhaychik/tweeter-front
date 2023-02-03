import { Component, Input } from '@angular/core';
import { Size } from '../../enums/enums';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent {
  @Input()
  public name: string = 'User Name';

  @Input()
  public size: Size = Size.s;
}
