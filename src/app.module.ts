import {
  BadRequestException,
  CanActivate,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    JwtModule.register({ secret: 'secret' }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    JwtStrategy,
    { provide: 'CustomGuard', useClass: AuthGuard() },
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject('CustomGuard') private readonly guard: CanActivate) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(async (req, res, next) => {
        const canActivate = await this.guard.canActivate({
          switchToHttp: () => ({
            getRequest: () => req,
            getResponse: () => res,
            getNext: () => next,
          }),
        } as any);
        if (canActivate) {
          next();
        } else {
          throw new BadRequestException();
        }
      })
      .forRoutes('graphql');
  }
}
