import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: true,
        });
        return drizzle(pool, {
          schema,
        }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}

/*
https://www.youtube.com/watch?v=xCjA88zNBx8
https://github.com/vahid-nejad/Drizzle-ORM-NestJS/blob/master/src/post/post.service.ts
https://www.youtube.com/watch?v=vLze97zZKsU
https://dev.to/franciscomendes10866/getting-started-with-drizzle-orm-a-beginners-tutorial-4782
*/
