import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { CommandBus } from '@nestjs/cqrs';
import { ProductToggleStatusCommand } from '@products/application/cqrs/commands/toggle-status.command';
import { ProductToggleStatusDoc } from '@products/interfaces/http/v1/toggle-status/dto/product-toggle-status-doc.decorator';
import { ProductToggleStatusRequestDto } from '@products/interfaces/http/v1/toggle-status/dto/product-toggle-status-request.dto';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductToggleStatusController {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(ProductToggleStatusController.name);
  }

  @Patch(':id/toggle-status')
  @ProductToggleStatusDoc()
  async toggleStatus(
    @Param('id') id: string,
    @Body() { status }: ProductToggleStatusRequestDto,
  ) {
    const command = new ProductToggleStatusCommand(id, status);
    await this.commandBus.execute(command);
  }
}
