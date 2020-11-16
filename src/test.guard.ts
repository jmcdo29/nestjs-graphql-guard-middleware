import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class TestGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const verified = this.jwt.verify(
        context
          .switchToHttp()
          .getRequest()
          .headers['authorization'].split(' ')[1],
      );
      console.log(verified);
      return true;
    } catch {
      return false;
    }
  }
}
