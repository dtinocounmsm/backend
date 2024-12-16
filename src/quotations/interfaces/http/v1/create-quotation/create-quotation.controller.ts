import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuotationCommand } from '@quotations/application/cqrs/commands/create-quotation.command';

@ApiTags('Quotations')
@Controller({ path: 'quotations', version: '1' })
export class CreateQuotationController {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(CreateQuotationController.name);
  }

  @Post()
  async create(@Body() createUserDto: any) {
    this.logger.log(JSON.stringify({ createUserDto }));
    const command = new CreateQuotationCommand(createUserDto);
    await this.commandBus.execute(command);
  }
}
