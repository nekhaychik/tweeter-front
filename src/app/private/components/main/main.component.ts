import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input()
  public user: User | null = null;

  constructor(private authService: AuthService) {}
  authUser = this.authService.user$;
}
