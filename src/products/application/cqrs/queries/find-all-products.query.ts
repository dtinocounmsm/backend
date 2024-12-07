import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { PostgreSQLProductRepository } from '@products/infrastructure/repositories/PostgreSQLProductRepository';
export class FindAllProductsQuery {}

@QueryHandler(FindAllProductsQuery)
export class FindAllProductsQueryHandler
  implements IQueryHandler<FindAllProductsQuery>
{
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    @Inject(PostgreSQLProductRepository)
    private readonly productRepository: ProductRepository,
  ) {
    this.customLoggerService.setContext(FindAllProductsQueryHandler.name);
  }

  async execute(): Promise<any> {
    this.customLoggerService.log('execute()');
    return await this.productRepository.findAll();
  }
}
