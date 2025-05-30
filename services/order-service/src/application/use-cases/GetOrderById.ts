// src/application/use-cases/GetOrderById.ts
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class GetOrderById {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }
}
