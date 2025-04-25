import e from "express";
import { validate } from "../middleware/auth/validate";
import { z } from "zod";
import { organizationToken } from "../middleware/auth/vendorJWT";
import { postRoom } from "../controller/room/postRoom.controller";
import { getRoom } from "../controller/room/getRoom.controller";
const roomschema = z.object({
    name : z.string(),
    type : z.enum(['VIP', "STANDART"])
})
export const RoomRouter = e.Router()
RoomRouter.post('/:vendorId', validate(roomschema), organizationToken, postRoom)
RoomRouter.get('/', organizationToken, getRoom)