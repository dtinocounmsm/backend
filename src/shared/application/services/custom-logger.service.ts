// custom-logger.service.ts
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { AsyncContextService } from '@shared/application/services/async-context-service';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  constructor(
    private readonly asyncContextService: AsyncContextService,
    context?: string,
  ) {
    super(context);
  }

  private getTraceId(): string {
    return this.asyncContextService.get('traceId') || 'no-trace';
  }

  log(message: any, ...optionalParams: any[]) {
    const traceId = this.getTraceId();
    super.log(`[${traceId}] ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    const traceId = this.getTraceId();
    super.error(`[${traceId}] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    const traceId = this.getTraceId();
    super.warn(`[${traceId}] ${message}`, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    const traceId = this.getTraceId();
    super.debug(`[${traceId}] ${message}`, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    const traceId = this.getTraceId();
    super.verbose(`[${traceId}] ${message}`, ...optionalParams);
  }
}
