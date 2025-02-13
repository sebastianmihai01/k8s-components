import express, { Express, Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';

export abstract class BaseService {
  protected app: Express;
  protected logger: any;

  constructor(protected readonly serviceName: string) {
    this.app = express();
    this.setupLogger();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupLogger() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      defaultMeta: { service: this.serviceName },
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
      ],
    });
  }

  protected setupMiddleware() {
    this.app.use(express.json());
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      this.logger.info(`Incoming ${req.method} request to ${req.path}`);
      next();
    });
  }

  protected abstract setupRoutes(): void;

  private setupErrorHandling() {
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      this.logger.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      this.logger.info(`${this.serviceName} listening on port ${port}`);
    });
  }
} 