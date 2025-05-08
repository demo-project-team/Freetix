
import "fastify";
import { Socket } from "socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: Socket;
  }
}
