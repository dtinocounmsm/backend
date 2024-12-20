import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAllUsersQuery } from '@user/application/cqrs/queries/find-all-users.query';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllUsersDocsDecorator } from '@user/interfaces/http/v1/find-all-users/dto/find-all-users-docs.decorator';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class FindAllUsersController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly queryBus: QueryBus,
  ) {
    this.customLoggerService.setContext(FindAllUsersController.name);
  }

  @Get()
  @FindAllUsersDocsDecorator()
  async findAll() {
    this.customLoggerService.log('findAll()');
    const query = new FindAllUsersQuery();
    return await this.queryBus.execute(query);
  }
}
