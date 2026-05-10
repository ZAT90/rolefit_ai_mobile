import type {NextFunction, Request, Response} from 'express';
import type {ZodTypeAny} from 'zod';

type RequestParts = {
  body?: unknown;
  params?: Request['params'];
};

export const validateRequest = (schema: ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    }) as RequestParts;

    req.body = parsed.body ?? req.body;
    req.params = parsed.params ?? req.params;

    next();
  };
};
