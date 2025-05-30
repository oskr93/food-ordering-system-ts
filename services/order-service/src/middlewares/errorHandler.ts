import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    const formatted = err.format();
    const errors: Record<string, string[]> = {};
    console.error('*** formatted:', formatted);
    for (const key in formatted) {
      if (key !== '_errors') {
        const value = formatted[key as keyof typeof formatted];
        if (value && typeof value === 'object' && '_errors' in value) {
          errors[key] = (value._errors as string[]) || [];
        }
      }
    }

    return res.status(400).json({
      error: 'Error de validación',
      details: errors,
    });
  }

  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message || 'Algo salió mal',
  });
}
