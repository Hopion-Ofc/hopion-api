import { Email } from '../../domain/entities/Email.js';
import { IEmailRepository } from '../../domain/repositories/IEmailRepository.js';

export class InMemoryEmailRepository implements IEmailRepository {
  private emails: Email[] = [];

  async save(email: Email): Promise<Email> {
    this.emails.push(email);
    return email;
  }

  async findById(id: string): Promise<Email | null> {
    return this.emails.find(email => email.id === id) || null;
  }

  async findAll(): Promise<Email[]> {
    return this.emails;
  }
}
