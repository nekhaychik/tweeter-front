export interface LoginResponse {
  data: {
    accessToken: string;
    refrfeshToken: string;
  };
  user: any;
}
