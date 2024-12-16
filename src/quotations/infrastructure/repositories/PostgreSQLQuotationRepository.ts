import { DRIZZLE } from '@db/drizzle.module';
import { quotations, quotationDetail } from '@db/schema/schema';
import { DrizzleDB } from '@db/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { QuotationRepository } from '@quotations/domain/repositories/quotation.repository';
import { QuotationRegistration } from '@quotations/domain/entities/quotation.entity';
import { QuotationDetail } from '@quotations/domain/entities/quotation-detail.entity';

@Injectable()
export class PostgreSQLQuotationRepository implements QuotationRepository {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {
    this.logger.setContext(PostgreSQLQuotationRepository.name);
  }

  async create(
    quotation: QuotationRegistration,
    items: QuotationDetail[],
  ): Promise<void> {
    let createdQuotation: any;
    const createdItems: any[] = [];
    try {
      // console.log({ quotation });
      // console.log({ items });
      await this.db.transaction(async (trx) => {
        const [createdQuotation] = await trx
          .insert(quotations)
          .values({ ...quotation.toPrimitives() })
          .returning();
        console.log({ createdQuotation });
        console.log(createdQuotation.id);
        if (!createdQuotation.id) {
          trx.rollback();
        }
        // iterate items
        for (const item of items) {
          const createItem = await trx
            .insert(quotationDetail)
            .values({
              ...item.toPrimitives(),
              quotationId: createdQuotation.id,
            })
            .execute();
          if (!createItem) {
            trx.rollback();
          }
          createdItems.push(createItem);
        }
      });

      this.logger.log(
        `Quotation created successfully. ${JSON.stringify(createdQuotation)} ${JSON.stringify(createdItems)}`,
      );
    } catch (error) {
      this.logger.error(`Failed to create quotation`, error);
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
