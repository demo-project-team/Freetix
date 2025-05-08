import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySocketIo from "fastify-socket.io";
import CallRouter from "./routes/chat.route";
import { Server } from "socket.io";
import registerSocket from "./socket";
import ChatRouter from "./routes/chat.route";
declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}
const fastify = Fastify();
fastify.register(cors, { origin: "*" });
fastify.register(fastifySocketIo, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"], 
});

fastify.register(ChatRouter, { prefix: "/api/chat" });
fastify.ready().then(() => {
  const io = fastify.io;
  registerSocket(io)
});

const PORT = 8080;
fastify.listen({port :PORT}, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`🚀 Server is running at ${address}`);
});
