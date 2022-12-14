import { Request, Response } from 'express';
import ILogin from '../interface/ILogin';
import Login from '../interface/Login';

export default class LoginController {
  private _loginService: Login;
  constructor(private loginService: Login) {
    this._loginService = loginService;
  }

  public async login(req:Request, res:Response): Promise<void> {
    const token = await this._loginService.login(req.body as ILogin);
    res.status(200).json(token);
  }

  public async user(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    const response = await this._loginService.user(authorization as string);
    res.status(200).json({ role: response });
  }
}
