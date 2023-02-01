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
