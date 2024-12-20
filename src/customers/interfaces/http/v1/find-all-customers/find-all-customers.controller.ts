import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllCustomersQuery } from '@customers/application/cqrs/queries/find-all-customers.query';

@ApiTags('Customers')
@Controller({ path: 'customers', version: '1' })
export class FindAllCustomersQueryController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly queryBus: QueryBus,
  ) {
    this.customLoggerService.setContext(FindAllCustomersQueryController.name);
  }

  @Get()
  async findAll() {
    this.customLoggerService.log('findAll()');
    const query = new FindAllCustomersQuery();
    return await this.queryBus.execute(query);
  }
}
