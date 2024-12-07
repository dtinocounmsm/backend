import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllProductsQuery } from '@products/application/cqrs/queries/find-all-products.query';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class FindAllProductsController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly queryBus: QueryBus,
  ) {
    this.customLoggerService.setContext(FindAllProductsController.name);
  }

  @Get()
  async findAll() {
    this.customLoggerService.log('findAll()');
    const query = new FindAllProductsQuery();
    return await this.queryBus.execute(query);
  }
}
