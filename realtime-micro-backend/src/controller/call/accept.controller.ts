import { FastifyReply, FastifyRequest } from "fastify";
import { acceptCall } from "../../services/call.service";

export const acceptCallController = async (request : FastifyRequest, reply :FastifyReply) => {
    const { callId, userId } = request.body as {
        callId: string;
        userId: string;
      };
      try {
        const result = acceptCall(callId, userId);
        reply.send(result);
      } catch (error) {
        console.error("Error in acceptCallController:", error);
        reply.status(500).send({ error: "Failed to accept call" });
      }
}