import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams';

import { Response } from 'superagent';
import ITeam from '../interface/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam[] =  [{
  "id": 1,
  "teamName": "Avaí/Kindermann"
},
{
  "id": 2,
  "teamName": "Bahia"
},
{
  "id": 3,
  "teamName": "Botafogo"
},]


describe('/teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamMock as Team);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return token', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/teams');
    expect(chaiHttpResponse.body).to.equal(teamMock);
  });
});

