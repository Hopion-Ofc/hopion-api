import { Email } from '../../domain/entities/Email.js';

export interface EmailResponse {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  createdAt: string;
}

export class EmailResponseMapper {
  static toResponse(email: Email): EmailResponse {
    return {
      id: email.id,
      to: email.to,
      from: email.from,
      subject: email.subject,
      body: email.body,
      createdAt: email.createdAt.toISOString()
    };
  }
}
