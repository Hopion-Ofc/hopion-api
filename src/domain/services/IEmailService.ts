export interface SendEmailData {
  to: string;
  toName?: string;
  from: string;
  fromName?: string;
  subject: string;
  html: string;
  text: string;
}

export interface IEmailService {
  send(data: SendEmailData): Promise<void>;
}
