import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { PostgreSQLProductRepository } from '@products/infrastructure/repositories/PostgreSQLProductRepository';

export class ProductToggleStatusCommand {
  constructor(
    readonly id: string,
    readonly status: boolean,
  ) {}
}

@CommandHandler(ProductToggleStatusCommand)
export class ProductToggleStatusCommandHandler
  implements ICommandHandler<ProductToggleStatusCommand>
{
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLProductRepository)
    private readonly productRepository: ProductRepository,
  ) {
    this.logger.setContext(ProductToggleStatusCommandHandler.name);
  }

  async execute({ id, status }: ProductToggleStatusCommand): Promise<void> {
    this.logger.log(`execute(${JSON.stringify({ id, status })})`);
    await this.toggleStatus(+id, status);
  }

  async toggleStatus(id: number, status: boolean): Promise<void> {
    try {
      await this.productRepository.toggleStatus(id, status);
    } catch (error) {
      this.logger.error(
        `toggleStatus(${JSON.stringify({ id, status })}): Error: ${(error as Error).message}`,
      );
      throw new BadRequestException((error as Error).message);
    }
  }
}
