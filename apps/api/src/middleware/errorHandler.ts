import { Request, Response, NextFunction } from 'express';
import logging from '@/config/logging';

const NAMESPACE = 'ErrorHandler';

export const notFound = (_req: Request, res: Response) => res.status(404).json({ message: 'Not found' });

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  logging.error(NAMESPACE, 'Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};
