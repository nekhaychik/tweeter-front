import { User } from './user.interface';

export interface LoginResponse {
  data: {
    accessToken: string;
    refrfeshToken: string;
  };
  user: User;
}
