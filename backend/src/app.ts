import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './routes/auth';
import todosRouter from './routes/todos';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;