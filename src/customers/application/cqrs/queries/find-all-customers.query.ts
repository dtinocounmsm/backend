import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { CustomerRepository } from '@customers/domain/repositories/customer.repository';
import { PostgreSQLCustomerRepository } from '@customers/infrastructure/repositories/PostgreSQLCustomerRepository';
export class FindAllCustomersQuery {}

@QueryHandler(FindAllCustomersQuery)
export class FindAllCustomersQueryHandler
  implements IQueryHandler<FindAllCustomersQuery>
{
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLCustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {
    this.logger.setContext(FindAllCustomersQueryHandler.name);
  }

  async execute(): Promise<any> {
    this.logger.log('execute()');
    return await this.customerRepository.findAll();
  }
}
