import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interfaces
import { LoginResponse } from 'src/app/model/response.interface';
import {
  User,
  UserLogIn,
  UserSignUp,
  UserSignUpVerify,
} from 'src/app/model/user.interface';

// Constants
import {
  ACCESS_TOKEN_FIELD,
  API,
  USER_EMAIL_FIELD,
} from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);

  public constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) {
    this.http
      .get<User>(`${API}/user/me`)
      .subscribe((user) => this.user$.next(user));
  }

  public login(user: UserLogIn): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API}/auth/sign-in`, user).pipe(
      tap((res: LoginResponse) =>
        localStorage.setItem(ACCESS_TOKEN_FIELD, res.data.accessToken)
      ),
      tap(() => {
        this.http
          .get<User>(`${API}/user/me`)
          .subscribe((user) => this.user$.next(user));
        this.snackbar.open('Login Successfull', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      })
    );
  }

  public signUp(user: UserSignUp): Observable<any> {
    return this.http
      .post(`${API}/auth/sign-up`, user)
      .pipe(tap(() => localStorage.setItem(USER_EMAIL_FIELD, user.email)));
  }

  public signUpVerify(emailCode: string): Observable<LoginResponse | null> {
    const email: string | null = localStorage.getItem(USER_EMAIL_FIELD);

    if (email) {
      const user: UserSignUpVerify = {
        email,
        emailCode,
      };

      return this.http
        .post<LoginResponse>(`${API}/auth/sign-up-verify`, user)
        .pipe(
          tap((res: LoginResponse) => {
            localStorage.removeItem(USER_EMAIL_FIELD);
            localStorage.setItem(ACCESS_TOKEN_FIELD, res.data.accessToken);
          }),
          tap(() =>
            this.snackbar.open('Authorization Successfull', 'Close', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            })
          )
        );
    } else {
      return of(null);
    }
  }

  public signOut() {
    return this.http
      .get(`${API}/auth/sign-out`, {
        withCredentials: true,
        headers: new HttpHeaders({
          ['Access-Control-Allow-Credentials']: 'true',
        }),
      })
      .pipe(tap(() => localStorage.removeItem(ACCESS_TOKEN_FIELD)))
      .subscribe(() => {
        this.user$.next(null);
        this.router.navigate(['/']);
      });
  }
}
