import { BadRequestException, ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PostgreSQLUserRepository } from '@user/infrastructure/repositories/PostgreSQLUserRepository';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { UserRegistration } from '@user/domain/entities/UserRegistration';
import { EmailValueObject } from '@shared/domain/value-objects/Email';

export class CreateUserCommand {
  constructor(readonly user: any) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    @Inject(PostgreSQLUserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.customLoggerService.setContext(CreateUserCommandHandler.name);
  }

  async execute(command: CreateUserCommand): Promise<void> {
    this.customLoggerService.log(`execute(${JSON.stringify(command)})`);
    const existingUser = await this.validateUserExists(command.user.email);
    if (existingUser) {
      this.customLoggerService.error(
        `execute(${JSON.stringify(command)}): Error: User already exists`,
      );
      throw new ConflictException('User already exists');
    }
    const user = this.createUser(command.user);
    await this.userRepository.create(user);
  }

  private createUser(user: any): UserRegistration {
    try {
      return UserRegistration.fromPrimitives({
        ...user,
      });
    } catch (error) {
      this.customLoggerService.error(
        `createUser(${JSON.stringify(user)}): Error: ${(error as Error).message}`,
      );
      throw new BadRequestException((error as Error).message);
    }
  }

  private async validateUserExists(email: string): Promise<unknown> {
    let emailVO: EmailValueObject;
    try {
      emailVO = EmailValueObject.create(email);
      return this.userRepository.findByEmail(emailVO.getValue());
    } catch (error) {
      this.customLoggerService.error(
        `validateUserExists(${JSON.stringify(email)}): Error: ${(error as Error).message}`,
      );
      throw new BadRequestException((error as Error).message);
    }
  }
}
