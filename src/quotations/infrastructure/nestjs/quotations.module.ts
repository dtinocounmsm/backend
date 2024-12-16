import { DrizzleModule } from '@db/drizzle.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateQuotationController } from '@quotations/interfaces/http/v1/create-quotation/create-quotation.controller';
import { CreateQuotationCommandHandler } from '@quotations/application/cqrs/commands/create-quotation.command';
import { PostgreSQLQuotationRepository } from '@quotations/infrastructure/repositories/PostgreSQLQuotationRepository';

const controllers = [CreateQuotationController];

const commandHandlers = [CreateQuotationCommandHandler];
const queryHandlers = [];
const application = [...commandHandlers, ...queryHandlers];

const infrastructure = [PostgreSQLQuotationRepository];

@Module({
  imports: [CqrsModule, DrizzleModule],
  controllers: [...controllers],
  providers: [...application, ...infrastructure],
})
export class QuotationsModule {}
