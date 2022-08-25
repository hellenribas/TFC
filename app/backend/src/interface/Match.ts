import Goals from './Goals';
import IMatch from './IMatch';
import Message from './Message';

export default interface Match {
  matches():Promise<IMatch[]>
  matchInProgress(match: IMatch):Promise<IMatch>
  matchInProgressId(id:string | number):Promise<Message>
  updatedInProgress(id:number, obj:Goals):Promise<unknown>
}
