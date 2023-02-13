import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// Enums
import { Size } from '../../../model/enums';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input()
  public name: string = '';

  @Input()
  public size: Size = Size.s;
}
