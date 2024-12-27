import { DrizzleModule } from '@db/drizzle.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductCommandHandler } from '@products/application/cqrs/commands/create-product.command';
import { CreateProductController } from '@products/interfaces/http/v1/create-product/create-product.controller';
import { PostgreSQLProductRepository } from '../repositories/PostgreSQLProductRepository';
import { FindAllProductsController } from '@products/interfaces/http/v1/find-all-products/find-all-products.controller';
import { FindAllProductsQueryHandler } from '@products/application/cqrs/queries/find-all-products.query';
import { ProductToggleStatusCommandHandler } from '@products/application/cqrs/commands/toggle-status.command';
import { ProductToggleStatusController } from '@products/interfaces/http/v1/toggle-status/product-toggle-status.controller';
import { DeleteProductController } from '@products/interfaces/http/v1/delete-product/delete-product.controller';
import { DeleteProductCommandHandler } from '@products/application/cqrs/commands/delete-product.command';

const controllers = [
  CreateProductController,
  DeleteProductController,
  FindAllProductsController,
  ProductToggleStatusController,
];

const commandHandlers = [
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  ProductToggleStatusCommandHandler,
];
const queryHandlers = [FindAllProductsQueryHandler];
const application = [...commandHandlers, ...queryHandlers];

const infrastructure = [PostgreSQLProductRepository];

@Module({
  imports: [CqrsModule, DrizzleModule],
  controllers: [...controllers],
  providers: [...application, ...infrastructure],
})
export class ProductsModule {}
