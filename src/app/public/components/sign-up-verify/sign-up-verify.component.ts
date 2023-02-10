import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

// Interfaces
import { SignUpVerifyControls } from 'src/app/model/control.interface';
import { Route } from 'src/app/model/enums';
import { User } from 'src/app/model/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-verify',
  templateUrl: './sign-up-verify.component.html',
  styleUrls: ['./sign-up-verify.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpVerifyComponent implements OnInit, OnDestroy {
  public signUpVerifyForm: FormGroup = new FormGroup({});
  public formControls: typeof SignUpVerifyControls = SignUpVerifyControls;
  private subscriptionsList: Subscription[] = [];
  private route: typeof Route = Route;

  public ngOnInit(): void {
    this.signUpVerifyForm.addControl(
      SignUpVerifyControls.emailCode,
      new FormControl(null, Validators.compose([Validators.required]))
    );
  }

  public constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public signUpVerify(): void {
    if (this.signUpVerifyForm.valid) {
      this.subscriptionsList.push(
        this.authService
          .signUpVerify(this.emailCode.value)
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

  public get emailCode(): FormControl {
    return this.signUpVerifyForm.get(
      SignUpVerifyControls.emailCode
    ) as FormControl;
  }

  public ngOnDestroy(): void {
    this.subscriptionsList.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
