import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserEmail = createParamDecorator((data: unknown, cxt: ExecutionContext) => {
  const request = cxt.switchToHttp().getRequest();
  return request.user;
});
