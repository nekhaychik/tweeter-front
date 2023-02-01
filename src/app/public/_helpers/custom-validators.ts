import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SignUpControls } from 'src/app/model/control.interface';

export class CustomValidators {
  public static passwordsMatching(
    control: AbstractControl
  ): ValidationErrors | null {
    const password: string = control.get(SignUpControls.password)?.value;
    const passwordConfirm: string = control.get(
      SignUpControls.passwordConfirm
    )?.value;

    if (
      password === passwordConfirm &&
      password !== null &&
      passwordConfirm !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
