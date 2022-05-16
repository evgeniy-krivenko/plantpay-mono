import { Response } from 'supertest';

export default function getCookiesFromResponse(response: Response): Record<string, any> {
  const cookiesArray: string[] = response.headers['set-cookie'];
  const cookieKeyValueObj: Record<string, any> = cookiesArray.reduce((acc, element) => {
    const [key, value] = element.split('; ')[0].split('=');
    acc[key] = value;
    return acc;
  }, {});
  return cookieKeyValueObj;
}
