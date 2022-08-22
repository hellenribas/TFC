import JWT from '../helpers/JWT';
import IToken from '../interface/IToken';
import ILogin from '../interface/ILogin';
import Login from '../interface/Login';
import User from '../database/models/users';
import Validation from '../helpers/Validation';

export default class LoginService implements Login {
  _user: ILogin;
  _token: string;

  constructor(private model = User) {}

  public async login(user: ILogin): Promise<IToken> {
    this._user = user;
    Validation.email(user.email);
    Validation.password(user.password);
    const response = await this.model.findOne({ where: { email: user.email } });
    Validation.user(response);
    const token = JWT.sign(user.email, user.password);
    return { token } as IToken;
  }

  public async user(token:string): Promise<string> {
    this._token = token;
    const userValidation = JWT.verify(token);
    const resValid = userValidation as ILogin;
    const findUser = await this.model.findOne({ where: { email: resValid.email } });
    const response = findUser as User;
    return response.role;
  }
}
