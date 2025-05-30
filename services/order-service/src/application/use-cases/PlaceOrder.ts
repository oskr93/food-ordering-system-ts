import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';
import { v4 as uuidv4 } from 'uuid';
import { PlaceOrderDTO } from '../dtos/PlaceOrderDTO';
import { kafkaProducer } from '../../infraestructure/kafka/KafkaClient';


export class PlaceOrder {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(request: PlaceOrderDTO): Promise<Order> {
    const order = new Order(
      uuidv4(),
      request.customer,
      request.total,
      'pending',
      new Date(),
      new Date()
    );

    const createdOrder = await this.orderRepository.create(order);

    // Enviar evento a Kafka
    await kafkaProducer.send({
      topic: 'order-created',
      messages: [
        {
          key: createdOrder.id,
          value: JSON.stringify({
            id: createdOrder.id,
            customer: createdOrder.customer,
            total: createdOrder.total,
            status: createdOrder.status,
            createdAt: createdOrder.createdAt.toISOString(),
          }),
        },
      ],
    });

    return createdOrder;
  }
}
