export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
}
