import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { PostgreSQLQuotationRepository } from '@quotations/infrastructure/repositories/PostgreSQLQuotationRepository';
import { QuotationRepository } from '@quotations/domain/repositories/quotation.repository';
import { Inject } from '@nestjs/common';
import { QuotationRegistration } from '@quotations/domain/entities/quotation.entity';
import { QuotationDetail } from '@quotations/domain/entities/quotation-detail.entity';

export class CreateQuotationCommand {
  constructor(readonly quotation: any) {}
}

@CommandHandler(CreateQuotationCommand)
export class CreateQuotationCommandHandler
  implements ICommandHandler<CreateQuotationCommand>
{
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLQuotationRepository)
    private readonly quotationRepository: QuotationRepository,
  ) {
    this.logger.setContext(CreateQuotationCommandHandler.name);
  }

  async execute(command: CreateQuotationCommand): Promise<void> {
    this.logger.log(`execute(${JSON.stringify(command)})`);

    const quotation = QuotationRegistration.fromPrimitives(
      command.quotation.header,
    );
    const detail = command.quotation.detail.map((item) =>
      QuotationDetail.fromPrimitives(item),
    );
    await this.quotationRepository.create(quotation, detail);
  }
}
