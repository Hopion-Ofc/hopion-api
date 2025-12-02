import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { IEmailService, SendEmailData } from '../../domain/services/IEmailService.js';

export class MailerSendService implements IEmailService {
  private mailerSend: MailerSend;

  constructor(apiKey: string) {
    this.mailerSend = new MailerSend({
      apiKey
    });
  }

  async send(data: SendEmailData): Promise<void> {
    const sentFrom = new Sender(data.from, data.fromName || data.from);
    const recipients = [new Recipient(data.to, data.toName || data.to)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(data.subject)
      .setHtml(data.html)
      .setText(data.text);

    await this.mailerSend.email.send(emailParams);
  }
}
