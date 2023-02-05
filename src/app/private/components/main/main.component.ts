import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  private subscriptionsList: Subscription[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.subscriptionsList.push(
      this.route.params.subscribe((params: Params) => {
        const id: string = params['id'];
        if (!id) {
          this.subscriptionsList.push(
            this.authService.user$.subscribe((user: User | null) => {
              if (user) {
                this.user = user;
                console.log(user);
                this.router.navigate([`./private/user-page/${this.user._id}`]);
              }
            })
          );
        } else {
          this.subscriptionsList.push(
            this.userService.getUserById(id).subscribe((user: User) => {
              this.user = user;
            })
          );
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionsList.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
