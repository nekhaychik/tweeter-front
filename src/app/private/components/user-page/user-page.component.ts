import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';

// Interface
import { User } from 'src/app/model/user.interface';

// Services
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  private subscriptions: Subscription[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        const id: string = params['id'];
        if (!id) {
          this.subscriptions.push(
            this.authService.user$.subscribe((user: User | null) => {
              if (user) {
                this.router.navigate([`./private/${user._id}`]);
              }
            })
          );
        } else {
          this.subscriptions.push(
            this.userService.getUserById(id).subscribe((user: User) => {
              this.user = user;
            })
          );
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
