import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { CreateProductCommand } from '@products/application/cqrs/commands/create-product.command';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class CreateProductController {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(CreateProductController.name);
  }

  @Post()
  async create(@Body() createProductDto: any) {
    this.logger.log(JSON.stringify({ createProductDto }));
    const command = new CreateProductCommand(createProductDto);
    await this.commandBus.execute(command);
  }
}
