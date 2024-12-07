import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '@user/application/cqrs/queries/find-user-by-id.query';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class FindUserByIdController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly queryBus: QueryBus,
  ) {
    this.customLoggerService.setContext(FindUserByIdController.name);
  }

  @Get('find')
  async findById(@Query('id') id: number) {
    this.customLoggerService.log(`findById(${JSON.stringify({ id })})`);
    const query = new FindUserByIdQuery(id);
    return await this.queryBus.execute(query);
  }
}
