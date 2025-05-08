import { FastifyReply, FastifyRequest } from "fastify";
import { sendMessage } from "../services/chat.service";

interface SendMessageBody {
  from: string;
  to: string;
  message: string;
  isRoom?: boolean;
}

export const sendMessageController = async (
  request: FastifyRequest<{ Body: SendMessageBody }>,
  reply: FastifyReply
) => {
  const { from, to, message, isRoom } = request.body;
  try {
    const result = await sendMessage({ from, to, message, isRoom });
    console.log(result);

    reply.send(result);
  } catch (error) {
    reply.status(500).send({ error, message: "Internal server error" });
  }
};
