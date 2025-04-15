import express, { Request, Response } from 'express';
import cors from 'cors';
import contactRoutes from './routes/contacts';

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());
app.use('/contacts', contactRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});