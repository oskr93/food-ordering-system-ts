import { PrismaClient } from '@prisma/client';
import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';

const prisma = new PrismaClient();

export class PrismaOrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    const created = await prisma.order.create({
      data: {
        id: order.id,
        customer: order.customer,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });

    return new Order(
      created.id,
      created.customer,
      created.total,
      created.status,
      created.createdAt,
      created.updatedAt
    );
  }

  async findById(id: string): Promise<Order | null> {
    const found = await prisma.order.findUnique({ where: { id } });
    if (!found) return null;

    return new Order(
      found.id,
      found.customer,
      found.total,
      found.status,
      found.createdAt,
      found.updatedAt
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany();
    return orders.map(
      (o) => new Order(o.id, o.customer, o.total, o.status, o.createdAt, o.updatedAt)
    );
  }
}
