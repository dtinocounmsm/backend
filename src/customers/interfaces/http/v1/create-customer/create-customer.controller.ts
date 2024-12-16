import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerCommand } from '@customers/application/cqrs/commands/create-custormer.command';

@ApiTags('Customers')
@Controller({ path: 'customers', version: '1' })
export class CreateCustomerController {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(CreateCustomerController.name);
  }

  @Post()
  async create(@Body() createCustomerDto: any) {
    this.logger.log(JSON.stringify({ createProductDto: createCustomerDto }));
    const command = new CreateCustomerCommand(createCustomerDto);
    await this.commandBus.execute(command);
  }
}
