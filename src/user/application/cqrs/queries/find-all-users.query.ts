import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';

export class FindAllUsersQuery {}

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersQueryHandler
  implements IQueryHandler<FindAllUsersQuery>
{
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.customLoggerService.setContext(FindAllUsersQueryHandler.name);
  }

  async execute(): Promise<any> {
    this.customLoggerService.log('execute()');
    return await this.userRepository.findAll();
  }
}
