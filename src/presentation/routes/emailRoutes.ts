import { Router } from 'express';
import { EmailController } from '../controllers/EmailController.js';
import { ReceiveEmailUseCase } from '../../application/use-cases/ReceiveEmailUseCase.js';
import { InMemoryEmailRepository } from '../../infrastructure/repositories/InMemoryEmailRepository.js';
import { MailerSendService } from '../../infrastructure/services/MailerSendService.js';
import { hmacAuth } from '../middlewares/hmacAuth.js';

const router = Router();

const emailRepository = new InMemoryEmailRepository();
const mailerSendService = new MailerSendService(
  process.env.MAILERSEND_API_KEY || ''
);
const receiveEmailUseCase = new ReceiveEmailUseCase(
  emailRepository,
  mailerSendService
);
const emailController = new EmailController(receiveEmailUseCase);

router.post('/emails', hmacAuth, (req, res) => emailController.receiveEmail(req, res));

export { router as emailRoutes };
