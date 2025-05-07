import Fastify from "fastify";
import cors from "@fastify/cors";
import { createServer } from "http";
import { Server } from "socket.io";
import registerSocket from "./socket";
import CallRouter from "./routes/call.route";

const fastify = Fastify();
const httpServer = createServer(fastify.server);

const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ['websocket', 'polling'],  // Make sure 'websocket' is enabled here
  });

registerSocket(io);
fastify.register(cors, { origin: "*" });
fastify.register(CallRouter, { prefix: "/api/call" });

const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
