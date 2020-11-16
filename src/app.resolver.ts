import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Message } from './model';

@Resolver(() => Message)
export class AppResolver {
  constructor(private readonly service: AppService) {}
  @Query(() => Message)
  getHello() {
    return this.service.getHello();
  }
}
