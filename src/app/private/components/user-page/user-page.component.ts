import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  public authUser!: User;
  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) => {
      if (user) {
        this.authUser = user;
      }
    });
  }
}
