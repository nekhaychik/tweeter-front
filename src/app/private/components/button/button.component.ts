import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// Enums
import { ButtonAppearance, ButtonSize } from '../../../model/enums';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  public appearance: ButtonAppearance = ButtonAppearance.primary;
  @Input()
  public size: ButtonSize = ButtonSize.m;
  @Input()
  public text: string = 'Button';
  @Input()
  public textColor: string = 'color: #ffffff;';
  @Input()
  public disabled: boolean = false;
  @Input()
  public icon: string = 'person_add';
}
