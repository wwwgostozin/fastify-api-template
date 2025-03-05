import { z } from "zod";

const envSchema = z.object({
    SERVER_PORT: z.string().url().optional(),
});

type EnvSchema = z.infer<typeof envSchema>;

export { envSchema, type EnvSchema };