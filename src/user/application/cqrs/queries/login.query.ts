import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';

export class LoginQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.logger.setContext(LoginQueryHandler.name);
  }

  async execute(query: LoginQuery) {
    const { email, password } = query;
    this.logger.log(`execute: ${JSON.stringify({ email, password: '***' })}`);
    const user = await this.userRepository.login(email, password);
    return !!user;
  }
}
