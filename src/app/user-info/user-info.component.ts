import { Component, Input } from '@angular/core';
import { Size } from '../enums';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  public avatarSize: Size = Size.xxl;
  public user = {
    name: 'User Name',
    email: 'user@email.com',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid undeillo, quibusdam beatae esse neque eos eligendi est excepturi quisquam reiciendis ipsum optio nobis numquamrepellat ipsam placeat similique! Nemo.',
  };
  public followers: number = 12;
  public following: number = 12;
  public buttonFollowText: string = 'Follow';
}
