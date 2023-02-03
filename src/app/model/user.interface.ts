export interface UserLogIn {
  email: string;
  password: string;
}

export interface UserSignUp {
  email: string;
  password: string;
  username: string;
}

export interface UserSignUpVerify {
  email: string;
  emailCode: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  avatarURL?: string;
  hashedPassword: string;
  emailCode: string;
  currentHashedRefreshToken?: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  description?: string;
}

export interface UpdateUser {
  email?: string;
  username?: string;
  password?: string;
  description?: string;
}

export interface SubscriptionI {
  userId: string;
  subscriberId: string;
}
