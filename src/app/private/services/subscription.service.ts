import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SubscriptionI } from 'src/app/model/user.interface';
import { API } from 'src/app/public/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptionUrl: string = API + '/subscription';

  public constructor(private http: HttpClient) {}

  public getAllUserSubscriptions(userId: string): Observable<SubscriptionI[]> {
    const url: string =
      this.subscriptionUrl + `/get-subscriptions?userId=${userId}`;
    return this.http
      .get<SubscriptionI[]>(url)
      .pipe(
        catchError(
          this.handleError<SubscriptionI[]>('getAllUserSubscriptions', [])
        )
      );
  }

  public getAllUserSubscribers(userId: string): Observable<SubscriptionI[]> {
    const url: string =
      this.subscriptionUrl + `/get-subscribers?userId=${userId}`;
    return this.http
      .get<SubscriptionI[]>(url)
      .pipe(
        catchError(
          this.handleError<SubscriptionI[]>('getAllUserSubscribers', [])
        )
      );
  }

  public subscribe(userId: string): Observable<SubscriptionI> {
    return this.http
      .post<SubscriptionI>(this.subscriptionUrl + `?userId=${userId}`, null)
      .pipe(
        catchError(
          this.handleError<SubscriptionI>(`subscribe to user with id=${userId}`)
        )
      );
  }

  public unsubscribe(userId: string) {
    return this.http
      .delete(this.subscriptionUrl + `?userId=${userId}`)
      .pipe(
        catchError(
          this.handleError<SubscriptionI>(`unsubscribe user with id=${userId}`)
        )
      );
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
