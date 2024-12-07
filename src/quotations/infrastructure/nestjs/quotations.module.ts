import { DrizzleModule } from '@db/drizzle.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const controllers = [];

const commandHandlers = [];
const queryHandlers = [];
const application = [...commandHandlers, ...queryHandlers];

const infrastructure = [];

@Module({
  imports: [CqrsModule, DrizzleModule],
  controllers: [...controllers],
  providers: [...application, ...infrastructure],
})
export class QuotationsModule {}
