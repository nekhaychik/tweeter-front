import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

// Interfaces
import { SignUpControls } from 'src/app/model/control.interface';

// Services
import { AuthService } from '../../services/auth-service/auth.service';

// Custom validators
import { CustomValidators } from '../../_helpers/custom-validators';

// Constants
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LEGTH,
} from '../../constants/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public signUpForm: FormGroup = new FormGroup(
    {},
    { validators: CustomValidators.passwordsMatching }
  );
  public formControls: typeof SignUpControls = SignUpControls;

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
      this.authService
        .signUp({
          email: this.email.value,
          password: this.password.value,
          username: this.username.value,
        })
        .pipe(tap(() => this.router.navigate(['./public/sign-up-verify'])))
        .subscribe();
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
}
