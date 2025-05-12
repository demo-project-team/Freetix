import express from 'express';
import { AuthRouter } from './routes/auth.route';
import { CategoryRouter } from './routes/category.routes';
import { VendorRouter } from './routes/vendor.route';
import { VendoraRouter } from './routes/vendora.route';
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
// import { startBookingCancelCron } from './jobs/paymentStatusCron';
// import { startBookingStatusCron } from './jobs/bookingStatusCron';
import http from 'http';
import { Server } from 'socket.io';
import { registerSocketHandlers } from './socket';
import { ReviewRouter } from './routes/review.route';
// import { nortifcation } from './jobs/notificationCron';
import { pcStatusCronJob } from './jobs/pcStatusCron';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://192.168.20.188:3000', 'http://localhost:3000', process.env.FRONT_URL!],
    methods: ['GET', 'POST'],
  },
});
app.use(
  cors({
    origin: [
      process.env.FRONT_URL ? process.env.FRONT_URL : 'http://localhost:3000',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://192.168.20.188:3000',
    ],
    credentials: true,
  }),
);

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
app.use('/vendora', VendoraRouter);
app.use('/org', OrganizationRouter);
app.use('/address', AddressRouter);
app.use('/room', RoomRouter);
app.use('/address', AddressRouter);
app.use('/payment', PaymentRouter);
app.use('/review', ReviewRouter);
app.get('/', (_req, res) => {
  res.send('Hello from TypeScript + Express!');
});
// startBookingCancelCron();
// startBookingStatusCron();
pcStatusCronJob();
registerSocketHandlers(io);
// nortifcation(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
