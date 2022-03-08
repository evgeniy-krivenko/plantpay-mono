import { AuthGuard } from '@nestjs/passport';

export class JwtAccessGuard extends AuthGuard('jwt-access') {}
