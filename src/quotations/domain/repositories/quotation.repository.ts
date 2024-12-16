import { QuotationRegistration } from '../entities/quotation.entity';
import { QuotationDetail } from '@quotations/domain/entities/quotation-detail.entity';

export interface QuotationRepository {
  create(
    quotation: QuotationRegistration,
    items: QuotationDetail[],
  ): Promise<void>;
  // findAll(): Promise<any[]>;
  // findById(id: number): Promise<any>;
  // delete(id: number): Promise<any>;
}
