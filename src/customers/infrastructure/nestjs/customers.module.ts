import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DrizzleModule } from '@db/drizzle.module';
import { FindAllCustomersQueryController } from '@customers/interfaces/http/v1/find-all-customers/find-all-customers.controller';
import { FindAllCustomersQueryHandler } from '@customers/application/cqrs/queries/find-all-customers.query';
import { PostgreSQLCustomerRepository } from '@customers/infrastructure/repositories/PostgreSQLCustomerRepository';
import { CreateCustomerCommandHandler } from '@customers/application/cqrs/commands/create-custormer.command';
import { CreateCustomerController } from '@customers/interfaces/http/v1/create-customer/create-customer.controller';

export const CustomerRepositoryImpl = Symbol('CustomerRepositoryImpl');

const controllers = [CreateCustomerController, FindAllCustomersQueryController];

const commandHandlers = [CreateCustomerCommandHandler];
const queryHandlers = [FindAllCustomersQueryHandler];
const application = [...commandHandlers, ...queryHandlers];

const infrastructure = [PostgreSQLCustomerRepository];

@Module({
  imports: [CqrsModule, DrizzleModule],
  controllers: [...controllers],
  providers: [
    ...application,
    ...infrastructure,
    {
      provide: CustomerRepositoryImpl,
      useClass: PostgreSQLCustomerRepository,
    },
  ],
  exports: [CustomerRepositoryImpl],
})
export class CustomersModule {}
