import express from 'express';
import { AuthRouter } from './routes/auth.route';
import { CategoryRouter } from './routes/category.routes';
import { VendorRouter } from './routes/vendor.route';
import cors from 'cors';
import { OrganizationRouter } from './routes/organiztion.route';
import 'dotenv/config';
import { AddressRouter } from './routes/address.route';
import { RoomRouter } from './routes/room.route';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { PaymentRouter } from './routes/payment.route';
import { Pool } from 'pg';
import pgSession from 'connect-pg-simple';
const app = express();
app.use(
  cors({
    origin: [
      process.env.FRONT_URL ? process.env.FRONT_URL : 'http://localhost:3000',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;
const pgStore = pgSession(session);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: new pgStore({ pool }),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', AuthRouter);
app.use('/category', CategoryRouter);
app.use('/vendor', VendorRouter);
app.use('/org', OrganizationRouter);
app.use('/address', AddressRouter);
app.use('/room', RoomRouter);
app.use('/address', AddressRouter);
app.use('/payment', PaymentRouter);
app.get('/', (_req, res) => {
  res.send('Hello from TypeScript + Express!');
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
