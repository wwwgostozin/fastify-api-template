import { envSchema, type EnvSchema } from "./env.js";
import ck from "chalk";

import "./global.js";
import { log } from "./log.js";

export { log };

export function validateEnv(){
    const result = envSchema.safeParse(process.env);
    if (!result.success){
        const u = ck.underline;
        for(const error of result.error.errors){
            const { path, message } = error;
            log.error(`ENV VAR: ${ck.bold(path)} ${message}`);
            if (error.code == "invalid_type")
                log.info(
                    ck.dim(`└ "Expected: ${u(error.expected)} | Received: ${u(error.received)}`)
                );
        }
        log.info();
        log.warn(
            `Some ${ck.magenta("environment variables")} are undefined.`,
            `  Below are some ways to avoid these errors:`,
            `- Run the project with ${u("package.json")} scripts that contain the ${ck.blue("--env-file")} flag. `,
            `- Inject the ${u("variables")} into the environment in some way`
        );
        process.exit(1);
    }
    process.env=Object({ ...process.env, ...result.data });
    log.info(ck.green(`◌ ${ck.magenta("Environment variables")} loaded ✓`));
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Readonly<EnvSchema> {}
    }
}