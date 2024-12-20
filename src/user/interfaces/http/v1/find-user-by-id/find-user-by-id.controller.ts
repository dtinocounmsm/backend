import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '@user/application/cqrs/queries/find-user-by-id.query';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';
import { FindUserByIdDocsDecorator } from '@user/interfaces/http/v1/find-user-by-id/dto/find-user-by-id-docs.decorator';

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
  @FindUserByIdDocsDecorator()
  async findById(@Query('id') id: number) {
    this.customLoggerService.log(`findById(${JSON.stringify({ id })})`);
    const query = new FindUserByIdQuery(id);
    const user = await this.queryBus.execute(query);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
