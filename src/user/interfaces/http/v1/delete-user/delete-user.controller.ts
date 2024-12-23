import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { DeleteUserCommand } from '@user/application/cqrs/commands/delete-user.command';
import { DeleteUserDocsDecorator } from '@user/interfaces/http/v1/delete-user/dto/delete-user-docs.decorator';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class DeleteUserController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.customLoggerService.setContext(DeleteUserController.name);
  }

  @Delete(':id')
  @DeleteUserDocsDecorator()
  async delete(@Param('id') id: number) {
    this.customLoggerService.log(`delete(${JSON.stringify({ id })})`);
    const command = new DeleteUserCommand(id);
    return await this.commandBus.execute(command);
  }
}
