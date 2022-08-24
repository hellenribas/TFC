import { NextFunction, Request, Response } from 'express';
import VerifyError from '../service/VerifyError';

export default class ErrorMiddleware {
  public static errors(error: Error, _req: Request, res: Response, next: NextFunction) {
    const { status, message } = error as VerifyError;
    if (message === 'invalid token') {
      res.status(401).json({ message: 'Token must be a valid token' });
    }

    res.status(status || 500).json({ message });
    next();
  }
}
