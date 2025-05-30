// src/domain/repositories/IOrderRepository.ts
import { Order } from '../entities/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
