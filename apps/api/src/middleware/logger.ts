import { Request, Response, NextFunction } from 'express';
import logging from '@/config/logging';

const NAMESPACE = 'HTTP';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  if (!['HEAD', 'OPTIONS'].includes(req.method)) {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
  }
  next();
};
