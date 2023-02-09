import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of, tap } from 'rxjs';

// Interfaces & constants
import {
  CreateTweetI,
  LikeI,
  StatusI,
  TweetI,
  UpdateTweetI,
} from 'src/app/model/tweet.interface';
import { API } from 'src/app/public/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private tweetUrl: string = API + '/tweet';
  private likeUrl: string = API + '/like';

  public constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  public createTweet(tweet: CreateTweetI): Observable<TweetI> {
    return this.http.post<TweetI>(this.tweetUrl, tweet).pipe(
      catchError(this.handleError<any>('createTweet')),
      tap((tweet: TweetI) => {
        if (tweet) {
          this.snackbar.open('Tweet was successful created', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      })
    );
  }

  public repostTweet(repostedTweetId: string): Observable<TweetI> {
    const repostTweetUrl: string = this.tweetUrl + `/repost/${repostedTweetId}`;
    return this.http.post<TweetI>(repostTweetUrl, null).pipe(
      catchError(
        this.handleError<any>(`repostTweet repostedTweetId=${repostedTweetId}`)
      ),
      tap((tweet: TweetI) => {
        if (tweet) {
          this.snackbar.open('Tweet was successful reposted', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      })
    );
  }

  public getTweetById(tweetId: string): Observable<TweetI> {
    const getTweetUrl: string = this.tweetUrl + `/${tweetId}`;
    return this.http
      .get<TweetI>(getTweetUrl)
      .pipe(catchError(this.handleError<any>(`getTweetById id=${tweetId}`)));
  }

  public getAllUserTweets(userId: string): Observable<TweetI[]> {
    const getAllTweetsUrl: string = this.tweetUrl + `/all-tweets/${userId}`;
    return this.http
      .get<TweetI[]>(getAllTweetsUrl)
      .pipe(
        catchError(this.handleError<any>(`getAllUserTweets userId=${userId}`))
      );
  }

  public getMyTweets(): Observable<TweetI[]> {
    const getMyTweetsUrl: string = this.tweetUrl + '/my-tweets';
    return this.http
      .get<TweetI[]>(getMyTweetsUrl)
      .pipe(catchError(this.handleError<any>('getMyTweets')));
  }

  public updateTweet(
    tweet: UpdateTweetI,
    tweetId: string
  ): Observable<TweetI & StatusI> {
    const updateTweetUrl: string = this.tweetUrl + `/${tweetId}`;
    return this.http
      .put<TweetI & StatusI>(updateTweetUrl, tweet)
      .pipe(catchError(this.handleError<any>(`updateTweet id=${tweetId}`)));
  }

  public deleteTweet(tweetId: string): Observable<any> {
    const deleteTweetUrl: string = this.tweetUrl + `/${tweetId}`;
    return this.http
      .delete<any>(deleteTweetUrl)
      .pipe(catchError(this.handleError<any>(`deleteTweet id=${tweetId}`)));
  }

  public likeTweet(tweetId: string): Observable<LikeI> {
    const likeUrl: string = this.likeUrl + `/${tweetId}`;
    return this.http
      .post<LikeI>(likeUrl, null)
      .pipe(catchError(this.handleError<any>(`likeTweet id=${tweetId}`)));
  }

  public getAmountOfTweetLike(tweetId: string): Observable<number> {
    const likeUrl: string = this.likeUrl + `/amount/${tweetId}`;
    return this.http
      .get<number>(likeUrl)
      .pipe(
        catchError(this.handleError<any>(`getAmountOfTweetLike id=${tweetId}`))
      );
  }

  public getUsersLikedTweet(tweetId: string): Observable<string[]> {
    const likeUrl: string = this.likeUrl + `/users/${tweetId}`;
    return this.http
      .get<string[]>(likeUrl)
      .pipe(
        catchError(this.handleError<any>(`getUsersLikedTweet id=${tweetId}`))
      );
  }

  public unlike(tweetId: string): Observable<{ status: string }> {
    const likeUrl: string = this.likeUrl + `/${tweetId}`;
    return this.http
      .delete<{ status: string }>(likeUrl)
      .pipe(catchError(this.handleError<any>(`unlikeTweet id=${tweetId}`)));
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
