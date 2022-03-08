export interface TokenPayload {
  email: string;
}

export interface RefreshTokenAndCookies {
  token: string;
  refreshJWTCookies: string;
}
