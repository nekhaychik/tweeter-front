import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

// Services
import { AuthService } from '../../services/auth.service';

// Interface
import { LoginControls } from 'src/app/model/control.interface';
import { PASSWORD_MIN_LENGTH } from '../../constants/constants';
import { User } from 'src/app/model/user.interface';
import { Route } from 'src/app/model/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public route: typeof Route = Route;
  public loginForm: FormGroup = new FormGroup({});
  public formControls: typeof LoginControls = LoginControls;
  public authUser: User | null = null;
  private subscriptionsList: Subscription[] = [];

  public ngOnInit(): void {
    this.loginForm.addControl(
      LoginControls.email,
      new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      )
    );

    this.loginForm.addControl(
      LoginControls.password,
      new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH),
        ])
      )
    );

    this.subscriptionsList.push(
      this.authService.user$.subscribe(
        (user: User | null) => (this.authUser = user)
      )
    );
  }

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login(): void {
    if (this.loginForm.valid) {
      this.subscriptionsList.push(
        this.authService
          .login({
            email: this.email.value,
            password: this.password.value,
          })
          .pipe(
            switchMap(() => this.authService.user$),
            tap((user: User | null) => {
              if (user) {
                this.router.navigate([this.route.home]);
              }
            })
          )
          .subscribe()
      );
    }
  }

  public navigateToMyPage(): void {
    this.router.navigate([this.route.home]);
  }

  public get email(): FormControl {
    return this.loginForm.get(LoginControls.email) as FormControl;
  }

  public get password(): FormControl {
    return this.loginForm.get(LoginControls.password) as FormControl;
  }

  public ngOnDestroy(): void {
    this.subscriptionsList.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
