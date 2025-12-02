import { z } from 'zod';

export const receiveEmailSchema = z.object({
  name: z.string().min(2, 'Nome completo é obrigatório'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres')
});

export type ReceiveEmailRequest = z.infer<typeof receiveEmailSchema>;
