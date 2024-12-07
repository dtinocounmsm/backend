import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AsyncContextService } from '@shared/application/services/async-context-service';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  constructor(private readonly asyncContextService: AsyncContextService) {}

  use(req: Request, res: Response, next: Function) {
    const existingStore = this.asyncContextService.getStore();
    const store = existingStore || new Map<string, any>();

    const traceId = randomUUID();
    store.set('traceId', traceId);
    req['traceId'] = traceId;

    this.asyncContextService.run(() => {
      next();
    }, store);
  }
}
