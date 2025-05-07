import { FastifyReply, FastifyRequest } from "fastify";
import { initiateCall } from "../../services/call.service";
export const initiateCallController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { callerId, receiverId } = request.body as {
    callerId: string;
    receiverId: string;
  };
  try {
    const result = await initiateCall(callerId, receiverId);
    reply.send(result);
  } catch (error) {
    reply.status(500).send({ error: "Failed to initiate call" });
  }
};
