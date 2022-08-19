import { NextFunction, Request, Response } from 'express';
import VerifyError from '../service/VerifyError';

export default class ErrorMiddleware {
  public static errors(error: Error, _req: Request, res: Response, next: NextFunction) {
    const { status, message } = error as VerifyError;
    res.status(status).json({ message });
    next();
  }
}
