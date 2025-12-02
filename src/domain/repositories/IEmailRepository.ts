import { Email } from '../entities/Email.js';

export interface IEmailRepository {
  save(email: Email): Promise<Email>;
  findById(id: string): Promise<Email | null>;
  findAll(): Promise<Email[]>;
}
