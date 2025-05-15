/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

export const configLogin = async (req:Request, res : Response) => {
    try {
        res.send({succes : true})
    } catch (error:any) {
        res.status(500).json({error : error.message, message : "Internal server error"})
    }
}