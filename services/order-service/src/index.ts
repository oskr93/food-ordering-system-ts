import express, { Request, Response } from 'express';
import orderRoutes from './interfaces/routes/orderRoutes';
import { errorHandler   } from './middlewares/errorHandler';
import { ErrorRequestHandler } from 'express';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { kafkaProducer } from './infraestructure/kafka/KafkaClient';



const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use('/api/orders', orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler as ErrorRequestHandler );

(async () => {
  try {
    await kafkaProducer.connect();
    console.log('Kafka Producer conectado');

    app.listen(PORT, () => {
      console.log(`Order Service corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con Kafka:', error);
    process.exit(1);
  }
})();


