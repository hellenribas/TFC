import JWT from '../helpers/JWT';
import IToken from '../interface/IToken';
import ILogin from '../interface/ILogin';
import Login from '../interface/Login';
import User from '../database/models/users';
import Validation from '../helpers/Validation';

export default class LoginService implements Login {
  user: ILogin;

  public async login(user: ILogin): Promise<IToken> {
    this.user = user;
    Validation.email(user.email);
    Validation.password(user.password);
    const response = await User.findOne({ where: { email: user.email } });
    Validation.user(response);
    const token = JWT.sign(user.email, user.password);
    return { token } as IToken;
  }
}
