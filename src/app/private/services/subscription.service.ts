import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SubscriptionI } from 'src/app/model/user.interface';
import { API } from 'src/app/public/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptionUrl: string = '/subscription';

  public constructor(private http: HttpClient) {}

  public getAllUserSubscriptions(userId: string): Observable<SubscriptionI[]> {
    const url: string =
      API + this.subscriptionUrl + `/get-subscriptions?userId=${userId}`;
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
      API + this.subscriptionUrl + `/get-subscribers?userId=${userId}`;
    return this.http
      .get<SubscriptionI[]>(url)
      .pipe(
        catchError(
          this.handleError<SubscriptionI[]>('getAllUserSubscribers', [])
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