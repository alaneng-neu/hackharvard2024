import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class AccessDeniedException extends HttpException {
  public retry: boolean;

  constructor(status: number, message: string, retry = false) {
    super(status, message);
    this.retry = retry;
  }
}

export const errorHandler: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof HttpException) {
    let additionalErrorInfo = {};
    if (error instanceof AccessDeniedException)
      additionalErrorInfo = { ...additionalErrorInfo, retry: error.retry };

    res
      .status(error.status)
      .json({ ...additionalErrorInfo, message: error.message });
  } else {
    res.status(500).json({ message: JSON.stringify(error) });
    throw error;
  }
};
