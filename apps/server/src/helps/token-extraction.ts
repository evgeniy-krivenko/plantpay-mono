import { Request } from 'express';

export const tokenExtraction =
  (key: string) =>
  (req: Request): string | null => {
    let token: string | null = null;
    if (req && req.cookies) {
      token = req.cookies[key];
    }
    return token;
  };
