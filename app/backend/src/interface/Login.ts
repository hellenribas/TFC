import ILogin from './ILogin';
import IToken from './IToken';

export default interface Login {
  login(user: ILogin):Promise<IToken>
  user(token: string):Promise<string>
}
