import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export function zodErrorServerHandler(error: any, _req: FastifyRequest, reply: FastifyReply) {
     if (error instanceof ZodError) {
            return reply.status(StatusCodes.BAD_REQUEST).send({ 
                 message: "invalid informations",
                 erros: error.errors.map(err => ({
                     path: err.path.join("."),
                     message: err.message,
                 }))
            })
     };
    
     return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
}