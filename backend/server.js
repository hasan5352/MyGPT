import express from 'express';
import cors from 'cors';
import path from 'path';
import sequelize from './src/models/index.js'

const app = express();
const PORT = Number(process.env.PORT);

app.use(cors());
app.use(express.json());


await sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});