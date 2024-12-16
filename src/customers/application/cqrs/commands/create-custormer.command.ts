import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { PostgreSQLCustomerRepository } from '@customers/infrastructure/repositories/PostgreSQLCustomerRepository';
import { CustomerRepository } from '@customers/domain/repositories/customer.repository';
import { CustomerRegistration } from '@customers/domain/entities/customer-registration';

export class CreateCustomerCommand {
  constructor(readonly customer: any) {}
}

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLCustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {
    this.logger.setContext(CreateCustomerCommandHandler.name);
  }

  async execute(command: CreateCustomerCommand): Promise<void> {
    this.logger.log(`execute(${JSON.stringify(command)})`);
    const newCustomer = this.createCustomer(command.customer);
    await this.customerRepository.create(newCustomer);
  }

  private createCustomer(customer: any): CustomerRegistration {
    try {
      return CustomerRegistration.fromPrimitives({
        ...customer,
      });
    } catch (error) {
      this.logger.error(
        `createProduct(${JSON.stringify(customer)}): Error: ${(error as Error).message}`,
      );
      throw new BadRequestException((error as Error).message);
    }
  }
}
