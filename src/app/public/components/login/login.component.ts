import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

// Services
import { AuthService } from '../../services/auth-service/auth.service';

// Interface
import { LoginControls } from 'src/app/model/control.interface';

// Constants
import { PASSWORD_MIN_LENGTH } from '../../constants/constants';
import { User } from 'src/app/model/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public formControls: typeof LoginControls = LoginControls;

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
  }

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login(): void {
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.email.value,
          password: this.password.value,
        })
        .pipe(
          switchMap(() => this.authService.user$),
          tap((user: User | null) => {
            console.log(user)
            if (user) {
              this.router.navigate([`./private/${user._id}`]);
            }
          })
        )
        .subscribe();
    }
  }

  public get email(): FormControl {
    return this.loginForm.get(LoginControls.email) as FormControl;
  }

  public get password(): FormControl {
    return this.loginForm.get(LoginControls.password) as FormControl;
  }
}
