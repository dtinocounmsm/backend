import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from 'src/user/application/cqrs/commands/create-user.command';
import { CreateUserController } from 'src/user/interfaces/http/v1/create-user/create-user.controller';
import { FindAllUsersQueryHandler } from '@user/application/cqrs/queries/find-all-users.query';
import { DrizzleModule } from '@db/drizzle.module';
import { FindAllUsersController } from '@user/interfaces/http/v1/find-all-users/find-all-users.controller';
import { PostgreSQLUserRepository } from '../repositories/PostgreSQLUserRepository';
import { FindUserByIdQueryHandler } from '@user/application/cqrs/queries/find-user-by-id.query';
import { FindUserByIdController } from '@user/interfaces/http/v1/find-user-by-id/find-user-by-id.controller';
import { DeleteUserController } from '@user/interfaces/http/v1/delete-user/delete-user.controller';
import { DeleteUserCommandHandler } from '@user/application/cqrs/commands/delete-user.command';
import { AuthController } from '@user/interfaces/http/v1/auth/auth.controller';
import { LoginQueryHandler } from '@user/application/cqrs/queries/login.query';

const controllers = [
  AuthController,
  CreateUserController,
  FindAllUsersController,
  FindUserByIdController,
  DeleteUserController,
];
const commandHandlers = [CreateUserCommandHandler, DeleteUserCommandHandler];
const queryHandlers = [
  FindAllUsersQueryHandler,
  FindUserByIdQueryHandler,
  LoginQueryHandler,
];

const application = [...commandHandlers, ...queryHandlers];
const infrastructure = [PostgreSQLUserRepository];

@Module({
  imports: [CqrsModule, DrizzleModule],
  controllers: [...controllers],
  providers: [...application, ...infrastructure],
})
export class UserModule {}
