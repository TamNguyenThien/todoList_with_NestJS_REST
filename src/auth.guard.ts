import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';
// import * as jwt from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ) {
    const {headers} = context.switchToHttp().getRequest();
    // decode token lay id ng dung'
    const token = headers.authorization;
    const role =  sign(token, '12345');
    if(role) return true
    return false;
  }
}
