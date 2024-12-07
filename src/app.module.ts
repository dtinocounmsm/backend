import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from '@user/infrastructure/nestjs/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthcheckController } from './healthcheck.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '@db/drizzle.module';
import { TraceIdMiddleware } from '@shared/infrastructure/middlewares/trace-id.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncContextInterceptor } from '@shared/infrastructure/interceptors/async-context.interceptor';
import { AsyncContextModule } from '@shared/infrastructure/nest/async-context.module';
import { SharedModule } from '@shared/infrastructure/nest/shared.module';
import { TraceIdResponseInterceptor } from '@shared/infrastructure/interceptors/trace-id-response.interceptor';
import { ProductsModule } from '@products/infrastructure/nestjs/products.module';
import { QuotationsModule } from '@quotations/infrastructure/nestjs/quotations.module';

@Module({
  imports: [
    AsyncContextModule,
    HttpModule,
    TerminusModule,
    SharedModule,
    UserModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    QuotationsModule,
  ],
  controllers: [HealthcheckController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AsyncContextInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceIdResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
