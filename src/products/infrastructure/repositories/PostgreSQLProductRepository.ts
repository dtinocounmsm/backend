import { DRIZZLE } from '@db/drizzle.module';
import { products } from '@db/schema/schema';
import { DrizzleDB } from '@db/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { ProductRegistration } from '@products/domain/entities/product-registration';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostgreSQLProductRepository implements ProductRepository {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {
    this.logger.setContext(PostgreSQLProductRepository.name);
  }

  async create(product: ProductRegistration): Promise<void> {
    let createdProduct: unknown;
    try {
      createdProduct = await this.db
        .insert(products)
        .values({ ...product.toPrimitives() })
        .execute();
      this.logger.log(
        `Product created successfully. ${JSON.stringify(createdProduct)}`,
      );
    } catch (error) {
      this.logger.error(`Failed to create product`);
      throw new Error('Failed to create product');
    }
  }

  async findAll(): Promise<any[]> {
    this.logger.log(`findAll`);
    return this.db.query.products.findMany();
  }

  async findById(id: number): Promise<any> {
    this.logger.log(`findById(${JSON.stringify({ id })})`);
    return this.db.query.products.findFirst({
      where: eq(products.id, id),
    });
  }

  async delete(id: number): Promise<any> {
    this.logger.log(`deleteUser(${JSON.stringify({ id })})`);
    return this.db.delete(products).where(eq(products.id, id)).returning();
  }
}
