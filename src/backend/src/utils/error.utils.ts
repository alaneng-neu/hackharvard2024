import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof HttpException) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: JSON.stringify(error) });
    throw error;
  }
};
