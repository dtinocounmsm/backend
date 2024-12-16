import { CustomerRepository } from '@customers/domain/repositories/customer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { DRIZZLE } from '@db/drizzle.module';
import { DrizzleDB } from '@db/types/drizzle';
import { CustomerRegistration } from '@customers/domain/entities/customer-registration';
import { customers } from '@db/schema/customers.schema';

@Injectable()
export class PostgreSQLCustomerRepository implements CustomerRepository {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {
    this.logger.setContext(PostgreSQLCustomerRepository.name);
  }

  async findAll(): Promise<any[]> {
    this.logger.log(`findAll`);
    return this.db.query.customers.findMany();
  }

  async create(customer: CustomerRegistration): Promise<void> {
    let createdCustomer: unknown;
    try {
      this.logger.log(`create. ${JSON.stringify(customer)}`);
      createdCustomer = await this.db
        .insert(customers)
        .values({ ...customer.toPrimitives() })
        .execute();
      this.logger.log(
        `Customer created successfully. ${JSON.stringify(createdCustomer)}`,
      );
    } catch (error) {
      this.logger.error(`Failed to create customer`, error);
      throw new Error('Failed to create customer');
    }
  }
}
