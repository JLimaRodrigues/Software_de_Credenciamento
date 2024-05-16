import express from 'express';
import bodyParser from 'body-parser';
import { openDB, createUserTable } from './db/sqlite';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const setupDatabase = async () => {
  const db = await openDB();
  await createUserTable(db);
};

setupDatabase();

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});