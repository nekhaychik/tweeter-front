export interface TweetI {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  isComment: boolean;
  text?: string;
  imagesURLs?: string;
  authorId: string;
  parentRecordAuthorId?: string;
  parentRecordId?: string;
}

export interface LikeI {
  tweetId: string;
  userId: string;
  createdAt: Date;
}

export interface RepostI {
  tweetI: string;
  userI: string;
  createdAt: string;
}

export interface SaveI {
  tweetI: string;
  userI: string;
  createdAt: string;
}

export interface CreateTweetI {
  text?: string;
  isComment: boolean;
}

export interface UpdateTweetI {
  text?: string;
  isComment?: string;
}

export interface StatusI {
  status: Status;
}

export enum Status {
  success = 'success',
  error = 'error',
}
