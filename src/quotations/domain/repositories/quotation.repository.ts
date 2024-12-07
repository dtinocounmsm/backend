import { QuotationRegistration } from '../entities/quotation.entity';

export interface QuotationRepository {
  create(quotation: QuotationRegistration): Promise<void>;
  // findAll(): Promise<any[]>;
  // findById(id: number): Promise<any>;
  // delete(id: number): Promise<any>;
}
