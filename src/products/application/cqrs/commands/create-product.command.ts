import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { PostgreSQLProductRepository } from '@products/infrastructure/repositories/PostgreSQLProductRepository';
import { ProductRegistration } from '@products/domain/entities/product-registration';

export class CreateProductCommand {
  constructor(readonly product: any) {}
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PostgreSQLProductRepository)
    private readonly productRepository: ProductRepository,
  ) {
    this.logger.setContext(CreateProductCommandHandler.name);
  }

  async execute(command: CreateProductCommand): Promise<void> {
    this.logger.log(`execute(${JSON.stringify(command)})`);
    const newProduct = this.createProduct(command.product);
    await this.productRepository.create(newProduct);
  }

  private createProduct(user: any): ProductRegistration {
    try {
      return ProductRegistration.fromPrimitives({
        ...user,
      });
    } catch (error) {
      this.logger.error(
        `createProduct(${JSON.stringify(user)}): Error: ${(error as Error).message}`,
      );
      throw new BadRequestException((error as Error).message);
    }
  }
}
