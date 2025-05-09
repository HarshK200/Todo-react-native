export interface SigninResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;

  accessToken?: string;
  refreshToken?: string;
  message?: string;
  statusCode: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
