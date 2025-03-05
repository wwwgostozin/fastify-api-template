import { defineRoutes } from "#server";
import { type FastifyInstance } from "fastify";

export default defineRoutes((app: FastifyInstance, _done) => {
    app.get("/", async () => {
        return { message: "Hello, World!" };
    });
});