import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UpdateUser, User } from '../model/user.interface';
import { API } from '../public/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string = '/user';

  public constructor(private http: HttpClient) {}

  public getAuthUser(): Observable<User> {
    return this.http
      .get<User>(API + this.usersUrl + '/me')
      .pipe(catchError(this.handleError<User>(`getAuthUser`)));
  }

  public getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(API + this.usersUrl)
      .pipe(catchError(this.handleError<User[]>('getAllUsers', [])));
  }

  public getUserById(id: string): Observable<User> {
    const url: string = `${API + this.usersUrl}/${id}`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUserById id=${id}`)));
  }

  public updateUser(user: UpdateUser, id: string): Observable<any> {
    const url: string = `${API + this.usersUrl}/update/${id}`;
    return this.http
      .put<any>(url, user)
      .pipe(catchError(this.handleError<any>('updateHero')));
  }

  public getMyAmountOfFollowers(): Observable<number> {
    return this.http
      .get<any[]>(`${API}/subscription/get-my-subscribers`)
      .pipe(map((arr) => arr.length));
  }

  public getMyAmountOfFollowing(): Observable<number> {
    return this.http
      .get<any[]>(`${API}/subscription/get-my-subscriptions`)
      .pipe(map((arr) => arr.length));
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
