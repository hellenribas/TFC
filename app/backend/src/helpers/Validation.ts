import IMatch from '../interface/IMatch';
import VerifyError from '../service/VerifyError';

export default class Validation {
  public static email(email: string) {
    if (!email) throw new VerifyError(400, 'All fields must be filled');
    return true;
  }

  public static password(password: string) {
    if (!password) throw new VerifyError(400, 'All fields must be filled');
    return true;
  }

  public static user(user: object | null) {
    if (!user) throw new VerifyError(401, 'Incorrect email or password');
    return true;
  }

  public static matches(homeTeam:number, awayTeam:number) {
    if (homeTeam === awayTeam) {
      throw new VerifyError(
        401,
        'It is not possible to create a match with two equal teams',
      );
    }
    return true;
  }

  public static matchEqual(team:IMatch[], home:number, away:number) {
    const verif = team.some((e) => e.homeTeam !== home || e.awayTeam !== away);
    if (verif) throw new VerifyError(404, 'There is no team with such id!');
    return true;
  }
}
