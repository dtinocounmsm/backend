// async-context.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AsyncContextService } from '@shared/application/services/async-context-service';

@Injectable()
export class AsyncContextInterceptor implements NestInterceptor {
  constructor(private readonly asyncContextService: AsyncContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const store = this.asyncContextService.getStore();

    return new Observable((observer) => {
      this.asyncContextService.run(() => {
        next.handle().subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      }, store);
    });
  }
}
