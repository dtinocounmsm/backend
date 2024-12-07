import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { GlobalLoggerService } from '@shared/application/services/global-logger.service';
@Global()
@Module({
  providers: [CustomLoggerService, GlobalLoggerService],
  exports: [CustomLoggerService, GlobalLoggerService],
})
export class SharedModule {}
