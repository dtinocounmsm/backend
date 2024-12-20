import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/user/application/cqrs/commands/create-user.command';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDoc } from '@user/interfaces/http/v1/create-user/dto/create-user-doc.decorator';
import { CreateUserRequestDto } from '@user/interfaces/http/v1/create-user/dto/create-user-request.dto';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class CreateUserController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.customLoggerService.setContext(CreateUserController.name);
  }

  @Post()
  @CreateUserDoc()
  async create(@Body() createUserDto: CreateUserRequestDto) {
    this.customLoggerService.log(JSON.stringify({ ...createUserDto }));
    const command = new CreateUserCommand(createUserDto);
    await this.commandBus.execute(command);
  }
}
