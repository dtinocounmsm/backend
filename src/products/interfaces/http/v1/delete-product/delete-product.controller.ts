import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { DeleteProductDocsDecorator } from '@products/interfaces/http/v1/delete-product/dto/delete-product-docs.decorator';
import { DeleteProductCommand } from '@products/application/cqrs/commands/delete-product.command';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class DeleteProductController {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.customLoggerService.setContext(DeleteProductController.name);
  }

  @Delete(':id')
  @DeleteProductDocsDecorator()
  async delete(@Param('id') id: number) {
    this.customLoggerService.log(`delete(${JSON.stringify({ id })})`);
    const command = new DeleteProductCommand(id);
    return await this.commandBus.execute(command);
  }
}
