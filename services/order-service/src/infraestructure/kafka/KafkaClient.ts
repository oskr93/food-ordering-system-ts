import { Kafka } from 'kafkajs';

const brokers = process.env.KAFKA_BROKERS?.split(',') || ['kafka:9092'];


export const kafka = new Kafka({
  clientId: 'order-service',
  brokers
});

export const kafkaProducer = kafka.producer();
