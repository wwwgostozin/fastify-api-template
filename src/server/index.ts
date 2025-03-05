import fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import autoload from "@fastify/autoload";
import { log } from "#settings";
import ck from "chalk";
import path from "node:path";
import { zodErrorServerHandler } from "#functions";

export async function startServer(){
    const app = fastify();
    
    app.addHook("onRoute", route => {
        if (route.method === "HEAD" || route.method === "OPTIONS") return;
        log.success(` ${ck.blue(route.path)} ${ck.yellow(route.method)}`);
    });
    app.register(cors, { origin: "*" });
    app.setErrorHandler(zodErrorServerHandler);

    app.register(autoload, {
        dir: path.join(import.meta.dirname, "routes"),
        routeParams: true,
    });

    const port = Number(process.env.SERVER_PORT ?? 3000);

    await app.listen({ port, host: "0.0.0.0" })
    .catch(err => {
        log.error(err);
        process.exit(1);
    });
    log.info(ck.green(`● ${ck.underline("Fastify")} server listening on port ${port}`));
}

export type RouteHandler = (app: FastifyInstance, done: Function) => any;
export function defineRoutes(handler: RouteHandler){
    return (...[app, done]: Parameters<RouteHandler>) => {
        handler(app, done);
    }
}