import { Router } from 'express';
import { PrismaOrderRepository } from '../../infraestructure/repositories/PrismaOrderRepository';
import { PlaceOrder } from '../../application/use-cases/PlaceOrder';
import { OrderController } from '../controllers/OrderController';
import { GetOrderById } from '../../application/use-cases/GetOrderById';
import { GetAllOrders } from '../../application/use-cases/GetAllOrders';

const router = Router();

const orderRepository = new PrismaOrderRepository();
const placeOrder = new PlaceOrder(orderRepository);
const getOrderById = new GetOrderById(orderRepository);
const getAllOrders = new GetAllOrders(orderRepository);

const orderController = new OrderController(placeOrder,getOrderById,getAllOrders);

router.get('/', orderController.getAll);
router.post('/crear-pedido', orderController.create);
router.get('/:id', orderController.getById);



export default router;
