import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { PostgreSQLProductRepository } from '@products/infrastructure/repositories/PostgreSQLProductRepository';
import { ProductRepository } from '@products/domain/repositories/product.repository';

export class DeleteProductCommand {
  constructor(readonly id: number) {}
}

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLProductRepository)
    private readonly productRepository: ProductRepository,
  ) {
    this.logger.setContext(DeleteProductCommandHandler.name);
  }

  async execute(query: DeleteProductCommand): Promise<any> {
    const { id } = query;
    this.logger.log(`execute(${JSON.stringify({ id })})`);
    const user = await this.deleteProduct(id);
    return {
      user,
    };
  }

  private async deleteProduct(id: number): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (e) {
      this.logger.error(
        `deleteProduct(${JSON.stringify({ id })}): Error: ${(e as Error).message}`,
      );
      throw new InternalServerErrorException((e as Error).message);
    }
  }
}
