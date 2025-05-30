import { z } from 'zod';

export const PlaceOrderSchema = z.object({
  customer: z.string().min(1, 'El nombre del cliente es requerido'),
  total: z.number().positive('El total debe ser mayor que 0'),
});

export type PlaceOrderDTO = z.infer<typeof PlaceOrderSchema>;

