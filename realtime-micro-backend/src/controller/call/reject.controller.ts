import { FastifyReply, FastifyRequest } from "fastify";
import { rejectCall } from "../../services/call.service";

export const rejectCallController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { callId, userId } = request.body as {
    callId: string;
    userId: string;
  };
  try {
    const result = rejectCall(callId, userId);
    reply.send(result);
  } catch (error) {
    console.error("Error in rejectCallController:", error);
    reply.status(500).send({ error: "Failed to reject call" });
  }
};
