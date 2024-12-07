import { UserRegistration } from '../entities/UserRegistration';

export interface UserRepository {
  create(user: UserRegistration): Promise<any>;
  deleteUser(id: number): Promise<any>;
  find(id: number): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findAll(): Promise<any[]>;
}
