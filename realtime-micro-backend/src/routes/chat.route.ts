import { FastifyInstance } from "fastify";
import { sendMessageController } from "../controller/sendMessage.controller";

const ChatRouter = async (fastify:FastifyInstance) => {
    fastify.get('/', (request, reply)=>{
        console.log("worked");
        return reply.status(200).send({ message: 'Call endpoint is working!' });
    })
    fastify.post('/send', sendMessageController)
}
export default ChatRouter