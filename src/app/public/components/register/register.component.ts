import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

// Services
import { AuthService } from '../../services/auth.service';

// Custom validators
import { CustomValidators } from '../../_helpers/custom-validators';

// Interfaces, constants
import { SignUpControls } from 'src/app/model/control.interface';

import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LEGTH,
} from '../../constants/constants';
import { Route } from 'src/app/model/enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  public route: typeof Route = Route;
  public signUpForm: FormGroup = new FormGroup(
    {},
    { validators: CustomValidators.passwordsMatching }
  );
  public formControls: typeof SignUpControls = SignUpControls;
  private subscriptionsList: Subscription[] = [];

  public ngOnInit(): void {
    this.signUpForm.addControl(
      SignUpControls.email,
      new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      )
    );

    this.signUpForm.addControl(
      SignUpControls.username,
      new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(USERNAME_MIN_LEGTH),
          Validators.maxLength(USERNAME_MAX_LENGTH),
        ])
      )
    );

    this.signUpForm.addControl(
      SignUpControls.password,
      new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH),
        ])
      )
    );

    this.signUpForm.addControl(
      SignUpControls.passwordConfirm,
      new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH),
        ])
      )
    );
  }

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public register(): void {
    if (this.signUpForm.valid) {
      this.subscriptionsList.push(
        this.authService
          .signUp({
            email: this.email.value,
            password: this.password.value,
            username: this.username.value,
          })
          .pipe(tap(() => this.router.navigate([this.route.signUpVerify])))
          .subscribe()
      );
    }
  }

  public get email(): FormControl {
    return this.signUpForm.get(SignUpControls.email) as FormControl;
  }

  public get username(): FormControl {
    return this.signUpForm.get(SignUpControls.username) as FormControl;
  }

  public get password(): FormControl {
    return this.signUpForm.get(SignUpControls.password) as FormControl;
  }

  public get passwordConfirm(): FormControl {
    return this.signUpForm.get(SignUpControls.passwordConfirm) as FormControl;
  }

  public ngOnDestroy(): void {
    this.subscriptionsList.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
