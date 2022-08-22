import ITeam from './ITeam';

export default interface Team {
  teams():Promise<ITeam[]>
  teamId(id: string | number): Promise<ITeam>
}
