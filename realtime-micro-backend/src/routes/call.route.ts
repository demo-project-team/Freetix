import { FastifyInstance } from "fastify";
import { initiateCallController } from "../controller/call/call.controller";
import { acceptCallController } from "../controller/call/accept.controller";
import { rejectCallController } from "../controller/call/reject.controller";
import { endCallController } from "../controller/call/end.controller";

const CallRouter = async (fastify:FastifyInstance) => {
    fastify.get('/', (request, reply)=>{
        console.log("worked");
        return reply.status(200).send({ message: 'Call endpoint is working!' });
    })
    fastify.post('/initiate', initiateCallController);
    fastify.post('/accept', acceptCallController)
    fastify.post('/reject', rejectCallController)
    fastify.post('/end', endCallController)

}
export default CallRouter