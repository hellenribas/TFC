import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Login from '../database/models/Login';
import ILogin from '../interface/ILogin';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock: ILogin = {
  email: 'test@test.com',
  senha: '123456',
}

describe('/login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Login, "findOne")
      .resolves(loginMock as ILogin);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login');

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return token', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/login');
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});
