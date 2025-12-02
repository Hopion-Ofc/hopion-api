import { Request, Response } from 'express';
import { ReceiveEmailUseCase } from '../../application/use-cases/ReceiveEmailUseCase.js';
import { receiveEmailSchema } from '../requests/ReceiveEmailRequest.js';
import { EmailResponseMapper } from '../responses/EmailResponse.js';
import { ZodError } from 'zod';

export class EmailController {
  constructor(private readonly receiveEmailUseCase: ReceiveEmailUseCase) {}

  async receiveEmail(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = receiveEmailSchema.parse(req.body);
      
      const email = await this.receiveEmailUseCase.execute(validatedData);
      
      const response = EmailResponseMapper.toResponse(email);
      
      res.status(201).json({
        success: true,
        data: response
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }

      console.error('Error receiving email:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}
