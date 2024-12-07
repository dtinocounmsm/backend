// trace-id-response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncContextService } from '@shared/application/services/async-context-service';

@Injectable()
export class TraceIdResponseInterceptor implements NestInterceptor {
  constructor(private readonly asyncContextService: AsyncContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Obtiene el traceId del contexto asíncrono
    const traceId = this.asyncContextService.get('traceId') || 'no-trace';

    return next.handle().pipe(
      map((data) => {
        // Verifica si la respuesta ya es un objeto
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
          return {
            traceId,
            ...data,
          };
        } else {
          // Si la respuesta es un array u otro tipo, lo coloca en 'results'
          return {
            traceId,
            results: data,
          };
        }
      }),
    );
  }
}
