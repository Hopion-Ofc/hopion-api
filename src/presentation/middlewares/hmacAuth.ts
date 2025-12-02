import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const HMAC_SECRET = process.env.HMAC_SECRET || '';

export const hmacAuth = (req: Request, res: Response, next: NextFunction): void => {
  const signature = req.headers['x-hmac-signature'] as string;
  const timestamp = req.headers['x-hmac-timestamp'] as string;

  if (!signature || !timestamp) {
    res.status(401).json({
      success: false,
      message: 'Missing authentication headers'
    });
    return;
  }

  const now = Date.now();
  const requestTime = parseInt(timestamp, 10);
  const timeDiff = Math.abs(now - requestTime);
  
  if (timeDiff > 5 * 60 * 1000) {
    res.status(401).json({
      success: false,
      message: 'Request expired'
    });
    return;
  }

  const payload = timestamp + JSON.stringify(req.body);
  
  const expectedSignature = crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(payload)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    res.status(401).json({
      success: false,
      message: 'Invalid signature'
    });
    return;
  }

  next();
};
