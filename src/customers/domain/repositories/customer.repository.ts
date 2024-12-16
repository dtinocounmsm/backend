import { CustomerRegistration } from '@customers/domain/entities/customer-registration';

export interface CustomerRepository {
  create(customer: CustomerRegistration): Promise<void>;
  findAll(): Promise<any[]>;
}
