import { Request, Response, NextFunction } from 'express';
import logging from '@/config/logging';

const NAMESPACE = 'Performance';

export const performanceLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint(); // high-resolution timer

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000; // convert ns → ms

    logging.info(
      `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${durationMs.toFixed(2)}ms`,
      NAMESPACE
    );
  });

  next();
};
