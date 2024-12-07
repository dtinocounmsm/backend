import { Global, Module } from '@nestjs/common';
import { AsyncContextService } from '@shared/application/services/async-context-service';

@Global()
@Module({
  providers: [AsyncContextService],
  exports: [AsyncContextService],
})
export class AsyncContextModule {}
