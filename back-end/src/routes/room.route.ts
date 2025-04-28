import e from "express";
import { validate } from "../middleware/auth/validate";
import { z } from "zod";
import { organizationToken } from "../middleware/auth/vendorJWT";
import { postRoom } from "../controller/room/postRoom.controller";
import { getRoom } from "../controller/room/getRoom.controller";
import { postTable } from "../controller/table/postTable.controller";
import { getTable } from "../controller/table/getTable.controller";
import { GetUserRoom } from "../controller/room/userGetRoom.controller";
const roomschema = z.object({
    name : z.string(),
    type : z.enum(['VIP', "STANDART"])
})
const tableSchema = z.object({
    name : z.string(),
    row : z.number().positive(),
    col : z.number().positive()
})
export const RoomRouter = e.Router()
RoomRouter.post('/:vendorId', validate(roomschema), organizationToken, postRoom)
RoomRouter.get('/', organizationToken, getRoom)
RoomRouter.get('/user/:vendorId', GetUserRoom)
RoomRouter.post('/table/:roomId', organizationToken, validate(tableSchema), postTable)
RoomRouter.get('/table/:roomId', organizationToken, getTable)