import IMatch from './IMatch';

export default interface Match {
  matches():Promise<IMatch[]>
  matchInProgress(match: IMatch, token: string | undefined):Promise<IMatch>
}
