import { EmailEntity } from '../../domain/entities/Email.js';
import { IEmailRepository } from '../../domain/repositories/IEmailRepository.js';
import { IEmailService } from '../../domain/services/IEmailService.js';

export interface ReceiveEmailInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ReceiveEmailUseCase {
  private readonly RECIPIENT_EMAIL = process.env.MAILERSEND_FROM_EMAIL || ''
  private readonly SENDER_EMAIL = process.env.MAILERSEND_FROM_EMAIL || '';

  constructor(
    private readonly emailRepository: IEmailRepository,
    private readonly emailService: IEmailService
  ) {
  }

  async execute(input: ReceiveEmailInput): Promise<EmailEntity> {
    const email = EmailEntity.create({
      to: this.RECIPIENT_EMAIL,
      from: input.email,
      subject: `[Contato] ${input.subject}`,
      body: input.message
    });

    await this.emailRepository.save(email);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0c0c14; font-family: 'Source Sans 3', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0c0c14; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #13131F; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
                
                <tr>
                  <td style="background: linear-gradient(135deg, #1853CE 0%, #063088 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #f0f0f0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                      Nova Mensagem de Contato
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 16px; opacity: 0.9;">
                      Formulário do site Hopion
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0c0c14; border-radius: 12px; margin-bottom: 30px; border: 1px solid #1853CE;">
                      <tr>
                        <td style="padding: 25px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <span style="color: #1853CE; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Nome</span>
                                <p style="margin: 5px 0 0 0; color: #f0f0f0; font-size: 18px; font-weight: 600;">${input.name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <span style="color: #1853CE; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                <p style="margin: 5px 0 0 0; color: #f0f0f0; font-size: 18px; font-weight: 600;">
                                  <a href="mailto:${input.email}" style="color: #1853CE; text-decoration: none;">${input.email}</a>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style="color: #1853CE; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Assunto</span>
                                <p style="margin: 5px 0 0 0; color: #f0f0f0; font-size: 18px; font-weight: 600;">${input.subject}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0c0c14; border-radius: 12px; border-left: 4px solid #fd7213;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 15px 0; color: #fd7213; font-size: 20px; font-weight: 700;">Mensagem</h2>
                          <p style="margin: 0; color: #f0f0f0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${input.message}</p>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 30px; text-align: center; border-top: 1px solid #1853CE;">
                    <p style="margin: 0; color: #f0f0f0; font-size: 14px; opacity: 0.7;">
                      Este email foi enviado através do formulário de contato do site <strong style="color: #1853CE;">Hopion</strong>
                    </p>
                    <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 12px; opacity: 0.5;">
                      ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textContent = `
Nova mensagem de contato

Nome: ${input.name}
Email: ${input.email}
Assunto: ${input.subject}

Mensagem:
${input.message}

---
Este email foi enviado através do formulário de contato do site Hopion.
    `;

    
    await this.emailService.send({
      to: this.RECIPIENT_EMAIL,
      toName: 'Hopion Tech',
      from: this.SENDER_EMAIL,
      fromName: `${input.name} (via Hopion)`,
      subject: `[Contato] ${input.subject}`,
      html: htmlContent,
      text: textContent
    });

    return email;
  }
}
