import express from 'express';
import cors from 'cors';
import sequelize from './models/index.js'
import './models/associations.js';
import threadRoutes from './routes/threads.js'
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js'

import errorHandler from './utils/errorHandler.js';
import logger from './utils/logger.js'
import notFoundHandler from './utils/notFoundHandler.js';
import { jwtAuthMiddleware } from './utils/auth.js';

const app = express();
const PORT = Number(process.env.PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/user', jwtAuthMiddleware, userRoutes);
app.use('/api/threads', jwtAuthMiddleware, threadRoutes);


app.use(notFoundHandler)
app.use(errorHandler);

await sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});