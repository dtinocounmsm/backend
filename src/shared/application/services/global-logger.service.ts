// global-logger.service.ts
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { AsyncContextService } from '@shared/application/services/async-context-service';

@Injectable()
export class GlobalLoggerService extends ConsoleLogger {
  constructor(private readonly asyncContextService: AsyncContextService) {
    super();
    this.setContext('GlobalLogger');
  }

  private getTraceId(): string {
    return this.asyncContextService.get('traceId') || 'no-trace';
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(`[${this.getTraceId()}] ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(`[${this.getTraceId()}] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(`[${this.getTraceId()}] ${message}`, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(`[${this.getTraceId()}] ${message}`, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(`[${this.getTraceId()}] ${message}`, ...optionalParams);
  }
}
