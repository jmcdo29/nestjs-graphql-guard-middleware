import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwt: JwtService) {}

  private users: Array<{ username: string; password: string; id: number }> = [
    {
      username: 'test1',
      password: 'changeme',
      id: 1,
    },
    {
      username: 'test2',
      password: 'iambad',
      id: 2,
    },
  ];
  getHello(): { hello: string } {
    return { hello: 'how are you' };
  }

  login(user: { username: string; password: string }): string {
    const found = this.users.find(
      (u) => u.username === user.username && u.password === user.password,
    );
    if (found) {
      return this.jwt.sign({ user: found.username, id: found.id });
    }
    throw new UnauthorizedException();
  }

  validateJwt(jwt) {
    console.log(jwt);
    return this.jwt.verify(jwt);
  }
}
