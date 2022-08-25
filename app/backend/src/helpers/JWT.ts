import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import ILogin from '../interface/ILogin';

dotenv.config();

export default class JWT {
  static sign(email: string, password: string): string {
    const SECRET: Secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ email, password }, SECRET);
    return token;
  }

  static verify(token: string): ILogin | void {
    const SECRET: Secret = process.env.JWT_SECRET as string;
    const validate = jwt.verify(token, SECRET);
    return validate as ILogin;
  }
}
