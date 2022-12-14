import * as express from 'express';
import 'express-async-errors';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import routerLogin from './router/Login';
import routerTeam from './router/Team';
import routerMatch from './router/Match';
import routerLeader from './router/Leaderboard';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(routerLogin);
    this.app.use(routerTeam);
    this.app.use(routerMatch);
    this.app.use(routerLeader);
    this.app.use(ErrorMiddleware.errors);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
