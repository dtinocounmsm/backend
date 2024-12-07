import { DRIZZLE } from '@db/drizzle.module';
import { users } from '@db/schema/schema';
import { DrizzleDB } from '@db/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { UserRegistration } from '@user/domain/entities/UserRegistration';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { eq } from 'drizzle-orm';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';

@Injectable()
export class PostgreSQLUserRepository implements UserRepository {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {
    this.logger.setContext(PostgreSQLUserRepository.name);
  }

  async create(user: UserRegistration): Promise<any> {
    this.logger.log(`create: ${JSON.stringify({ user })}`);
    return this.db
      .insert(users)
      .values({ ...UserRegistration.toPrimitives(user) })
      .returning();
  }

  async find(id: number): Promise<any> {
    this.logger.log(`findById(${JSON.stringify({ id })})`);
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        password: false,
      },
    });
  }

  async findByEmail(email: string): Promise<any> {
    this.logger.log(`findByEmail(${JSON.stringify({ email })})`);
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        email: true,
        password: false,
      },
    });
  }

  async findAll(): Promise<any[]> {
    this.logger.log(`findAll`);
    return this.db.query.users.findMany({
      columns: {
        password: false,
      },
    });
  }

  async deleteUser(id: number): Promise<any> {
    this.logger.log(`deleteUser(${JSON.stringify({ id })})`);
    return this.db.delete(users).where(eq(users.id, id)).returning();
  }
}
