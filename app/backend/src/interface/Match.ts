import IMatch from './IMatch';

export default interface Match {
  matches():Promise<IMatch[]>
}
