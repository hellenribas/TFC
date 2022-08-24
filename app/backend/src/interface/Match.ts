import IMatch from './IMatch';
import Message from './Message';

export default interface Match {
  matches():Promise<IMatch[]>
  matchInProgress(match: IMatch, token: string | undefined):Promise<IMatch>
  matchInProgressId(id:string | number):Promise<Message>
}
