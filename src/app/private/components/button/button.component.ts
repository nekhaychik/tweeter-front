import { Component, Input } from '@angular/core';
import { ButtonAppearance, ButtonSize } from '../../enums/enums';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  public appearance: ButtonAppearance = ButtonAppearance.primary;

  @Input()
  public size: ButtonSize = ButtonSize.m;

  @Input()
  public text: string = 'Button';
}
