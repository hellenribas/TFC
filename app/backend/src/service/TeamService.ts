import ITeam from '../interface/ITeam';
import Team from '../database/models/teams';

export default class TeamService {
  constructor(private model = Team) {}
  public async teams(): Promise<ITeam[]> {
    const findTeams = await this.model.findAll();
    const response = findTeams as ITeam[];
    return response;
  }

  public async teamId(id: string | number): Promise<ITeam> {
    const findTeams = await this.model.findOne({ where: { id } });
    const response = findTeams as ITeam;
    return response;
  }
}
