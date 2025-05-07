import { FastifyReply, FastifyRequest } from "fastify";
import { endCall } from "../../services/call.service";

export const endCallController = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { callId, userId } = request.body as {
      callId: string;
      userId: string;
    };
    
    try {
      const result = endCall(callId, userId);
      reply.send(result);
    } catch (error) {
      console.error("Error in endCallController:", error);
      reply.status(500).send({ error: "Failed to end call" });
    }
  };