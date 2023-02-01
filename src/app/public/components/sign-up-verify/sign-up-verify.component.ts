import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

// Interfaces
import { SignUpVerifyControls } from 'src/app/model/control.interface';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-sign-up-verify',
  templateUrl: './sign-up-verify.component.html',
  styleUrls: ['./sign-up-verify.component.css'],
})
export class SignUpVerifyComponent implements OnInit {
  public signUpVerifyForm: FormGroup = new FormGroup({});
  public formControls: typeof SignUpVerifyControls = SignUpVerifyControls;

  public ngOnInit(): void {
    this.signUpVerifyForm.addControl(
      SignUpVerifyControls.emailCode,
      new FormControl(null, Validators.compose([Validators.required]))
    );
  }

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public signUpVerify(): void {
    if (this.signUpVerifyForm.valid) {
      this.authService
        .signUpVerify(this.emailCode.value)
        .pipe(
          tap((res) => {
            if (res) {
              this.router.navigate(['/']);
            }
          })
        )
        .subscribe();
    }
  }

  public get emailCode(): FormControl {
    return this.signUpVerifyForm.get(
      SignUpVerifyControls.emailCode
    ) as FormControl;
  }
}
