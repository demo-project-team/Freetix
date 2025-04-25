import express from 'express';
import { AuthRouter } from './routes/auth.route';
import { CategoryRouter } from './routes/category.routes';
import { VendorRouter } from './routes/vendor.route';
import cors from 'cors';
import { ServiceRouter } from './routes/service.route';
import { OrganizationRouter } from './routes/organiztion.route';
import 'dotenv/config'
import { AddressRouter } from './routes/address.route';
import { RoomRouter } from './routes/room.route';
import { AddressRouter } from './routes/address.route';

const app = express();
app.use(
  cors({
    origin:[process.env.FRONT_URL ? process.env.FRONT_URL : 'http://localhost:3000', 'http://localhost:3000'],
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello from TypeScript + Express!');
});

app.use('/auth', AuthRouter);
app.use('/category', CategoryRouter);
app.use('/vendor', VendorRouter);
app.use('/service', ServiceRouter)
app.use('/org', OrganizationRouter)
app.use('/address', AddressRouter)
app.use('/room', RoomRouter)
app.use('/address', AddressRouter)


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
