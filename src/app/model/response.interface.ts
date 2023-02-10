import { User } from './user.interface';

export interface LoginResponse {
  data: {
    accessToken: string;
    refrfeshToken: string;
  };
  cookies: {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expires?: number;
    secure: boolean;
  }[];
}
