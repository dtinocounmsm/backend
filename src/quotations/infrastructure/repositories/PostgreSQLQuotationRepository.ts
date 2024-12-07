import { DRIZZLE } from '@db/drizzle.module';
import { quotations } from '@db/schema/schema';
import { DrizzleDB } from '@db/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
// import { eq } from 'drizzle-orm';
import { QuotationRepository } from '@quotations/domain/repositories/quotation.repository';
import { QuotationRegistration } from '@quotations/domain/entities/quotation.entity';

@Injectable()
export class PostgreSQLQuotationRepository implements QuotationRepository {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {
    this.logger.setContext(PostgreSQLQuotationRepository.name);
  }

  async create(quotation: QuotationRegistration): Promise<void> {
    let createdQuotation: unknown;
    try {
      createdQuotation = await this.db
        .insert(quotations)
        .values({ ...quotation.toPrimitives() })
        .execute();
      this.logger.log(
        `Quotatation created successfully. ${JSON.stringify(createdQuotation)}`,
      );
    } catch (error) {
      this.logger.error(`Failed to create quotation`);
      throw new Error('Failed to create quotation');
    }
  }

  // async findAll(): Promise<any[]> {
  //   this.logger.log(`findAll`);
  //   return this.db.query.products.findMany();
  // }

  // async findById(id: number): Promise<any> {
  //   this.logger.log(`findById(${JSON.stringify({ id })})`);
  //   return this.db.query.products.findFirst({
  //     where: eq(products.id, id),
  //   });
  // }

  // async delete(id: number): Promise<any> {
  //   this.logger.log(`deleteUser(${JSON.stringify({ id })})`);
  //   return this.db.delete(products).where(eq(products.id, id)).returning();
  // }
}
