import { NextFunction, Request, Response } from 'express';
import VerifyError from '../service/VerifyError';
import JWT from '../helpers/JWT';

const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    JWT.verify(req.headers.authorization as string);
    next();
  } catch (e) {
    throw new VerifyError(401, 'Token must be a valid token');
  }
};

export default validateMiddleware;
