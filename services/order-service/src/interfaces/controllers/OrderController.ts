import { Request, Response, NextFunction  } from 'express';
import { PlaceOrder } from '../../application/use-cases/PlaceOrder';
import { GetOrderById } from '../../application/use-cases/GetOrderById';
import { GetAllOrders } from '../../application/use-cases/GetAllOrders';
import { PlaceOrderSchema } from '../../application/dtos/PlaceOrderDTO';


export class OrderController {
  constructor(
    private placeOrder: PlaceOrder,
    private getOrderById: GetOrderById,
    private getAllOrders: GetAllOrders
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = PlaceOrderSchema.parse(req.body);    
      const nuevoPedido = await this.placeOrder.execute(parsed);
      res.json(nuevoPedido);
    } catch (error) {
      next(error);
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const pedido = await this.getOrderById.execute(id);

      if (!pedido) {
        res.status(404).json({ error: 'Pedido no encontrado' });
        return;
      }

      res.json(pedido);
    } catch (error) {
      next(error);
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pedidos = await this.getAllOrders.execute();
      res.json(pedidos);
    } catch (error) {
      next(error);
    }
  }
}
