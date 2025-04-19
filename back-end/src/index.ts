import express from 'express';
import { AuthRouter } from './routes/auth.route';
import { CategoryRouter } from './routes/category.routes';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello from TypeScript + Express!');
});
app.use('/auth', AuthRouter)
app.use('/category', CategoryRouter)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
