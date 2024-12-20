import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';

export class FindUserByIdQuery {
  constructor(readonly id: number) {}
}

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler
  implements IQueryHandler<FindUserByIdQuery>
{
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.customLoggerService.setContext(FindUserByIdQueryHandler.name);
  }

  async execute(query: FindUserByIdQuery): Promise<any> {
    const { id } = query;
    this.customLoggerService.log(`execute(${JSON.stringify({ id })})`);
    return this.userRepository.find(id);
  }
}
