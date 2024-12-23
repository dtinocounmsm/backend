import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { UserIdValueObject } from '@user/domain/value-objects/user-id.vo';

export class FindUserByIdQuery {
  constructor(readonly id: number) {}
}

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler
  implements IQueryHandler<FindUserByIdQuery>
{
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.logger.setContext(FindUserByIdQueryHandler.name);
  }

  async execute({ id: userId }: FindUserByIdQuery): Promise<any> {
    let id: UserIdValueObject;

    try {
      id = new UserIdValueObject(userId);
    } catch (error: unknown) {
      this.logger.error(error);
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }

    this.logger.log(`execute(${JSON.stringify({ id: id.getValue() })})`);
    return this.userRepository.find(id.getValue());
  }
}
