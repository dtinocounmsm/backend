import { ProductRegistration } from '../entities/product-registration';

export interface ProductRepository {
  create(product: ProductRegistration): Promise<void>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any>;
  delete(id: number): Promise<any>;
  toggleStatus(id: number, status: boolean): Promise<any>;
}
