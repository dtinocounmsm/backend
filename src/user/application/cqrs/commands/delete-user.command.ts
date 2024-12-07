import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';

export class DeleteUserCommand {
  constructor(readonly id: number) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.customLoggerService.setContext(DeleteUserCommandHandler.name);
  }

  async execute(query: DeleteUserCommand): Promise<any> {
    const { id } = query;
    this.customLoggerService.log(`execute(${JSON.stringify({ id })})`);
    const user = await this.userRepository.deleteUser(id);
    return {
      user,
    };
  }
}
